import React, { useState, useEffect } from "react";
import { Icon } from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import logoForMarker from "../../images/marker-icon-custom.png";
import "./Map.css";
import {
  deleteProduct,
  getElectricityDataForProduct,
  getProductReportData,
  updateProduct,
} from "../../api/productApi";
import { useNavigate, useParams } from "react-router-dom";
import AddProductModal from "../AddProductModal/AddProductModal";

import { TbTrashFilled } from "react-icons/tb";
import { FaEdit } from "react-icons/fa";
import { FaDatabase } from "react-icons/fa";
import { BsBarChartLineFill } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";

const Map = ({ products, project }) => {
  const appLogo = new Icon({
    iconUrl: logoForMarker,
    iconSize: [50, 50],
  });

  const navigate = useNavigate();
  const params = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addProductModal, setAddProductModal] = useState(false);

  // eslint-disable-next-line
  const [mapProducts, setMapProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [productReportData, setProductReportData] = useState({});

  const [productName, setProductName] = useState("");
  const [peakPower, setPeakPower] = useState("");
  const [area, setArea] = useState("");
  const [orientation, setOrientation] = useState("");
  const [tilt, setTilt] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");

  useEffect(() => {
    setProductName(selectedProduct.productName);
    setPeakPower(selectedProduct.peakPower);
    setArea(selectedProduct.area);
    setOrientation(selectedProduct.orientation);
    setTilt(selectedProduct.tilt);
    setLon(selectedProduct.lon);
    setLat(selectedProduct.lat);
  }, [selectedProduct]);

  const data = {
    productName,
    peakPower,
    area,
    orientation,
    tilt,
    lon,
    lat,
  };

  const handleOpenModal = product => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleProductUpdate = async () => {
    const updateResponse = await updateProduct(selectedProduct._id, data);
    console.log(updateResponse);
    if (updateResponse.status === 200 && updateResponse.statusText === "OK") {
      setIsModalOpen(false);
      window.location = `/project/${params.id}`;
    }
  };

  const handleDeleteProduct = async id => {
    const deleteResponse = await deleteProduct(id);
    if (deleteResponse.status === 200) {
      window.location = `/project/${params.id}`;
    }
  };

  const handleGenerateData = async id => {
    setIsLoading(true);
    const res = await getElectricityDataForProduct(id);
    setTimeout(async () => {
      setIsLoading(false);
      if (res.status === 200) {
        navigate("/success");
      }
    }, 3000);
  };

  const handleViewReport = async id => {
    const res = await getProductReportData(id);
    console.log(res);
    if (res.status === 200 && res.statusText === "OK") {
      const data = res.data.product;
      setProductReportData(data);
      navigate(`/product/${data._id}/report`, {
        state: { productData: data },
      });
    }
  };

  const handleAddProductModalOpen = () => {
    setAddProductModal(true);
  };

  const handleAddProductModalClose = () => {
    setAddProductModal(false);
  };

  console.log(productReportData);
  const ClickHandler = ({ setLat, setLon }) => {
    const [clickedPosition, setClickedPosition] = useState(null);

    useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setClickedPosition([lat, lng]);
        setLat(lat);
        setLon(lng);
      },
    });

    return clickedPosition ? (
      <Marker position={clickedPosition} icon={appLogo}>
        <Popup>
          <div>
            <h2>Your Coordinates</h2>
            <p>Latitude: {clickedPosition[0]}</p>
            <p>Longitude: {clickedPosition[1]}</p>
          </div>

          <button
            type="button"
            data-toggle="modal"
            data-target="#staticBackdrop"
            className="btn btn-primary btn-sm"
            onClick={handleAddProductModalOpen}
          >
            <div className="button-content">
              <span className="icon__wrapper">
                <FaPlus className="react__icon" />
              </span>
              <span className="button-text"> Add Product</span>
            </div>
          </button>
        </Popup>
      </Marker>
    ) : null;
  };

  return (
    <div>
      <MapContainer
        className="map"
        center={
          mapProducts.length > 0
            ? [
                mapProducts[mapProducts.length - 1].lat,
                mapProducts[mapProducts.length - 1].lon,
              ]
            : [51.505, -0.09]
        }
        zoom={10}
        maxZoom={18}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          noWrap={true}
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {mapProducts.map((product, idx) => (
          <div key={product._id}>
            {/* {product.lat} */}
            <Marker position={[product.lat, product.lon]} icon={appLogo}>
              <Popup maxWidth={900} maxHeight={800}>
                <div>
                  <h1>{product.productName}</h1>

                  <p>Peak Power: {product.peakPower}W</p>
                  <p>orientation: {product.orientation}</p>
                  <p>
                    inclination/tilt: ({product.tilt}
                    <sup>o</sup>)
                  </p>
                  <p>area: {product.area}</p>
                  <p>latitude:{product.lat}</p>
                  <p>longitude: {product.lon}</p>

                  <div className="product__controls">
                    {product.isReadOnly === false && (
                      <>
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => handleGenerateData(product._id)}
                        >
                          <div className="button-content">
                            <span className="button-text">
                              {" "}
                              {isLoading
                                ? "Generating Data..."
                                : "Generate Data"}{" "}
                            </span>
                            <span className="icon__wrapper">
                              <FaDatabase className="react__icon" />
                            </span>
                          </div>
                        </button>
                        {product.ownedByCompany === "" && (
                          <>
                            <button
                              type="button"
                              data-toggle="modal"
                              data-target="#staticBackdrop"
                              className="btn btn-warning btn-sm"
                              onClick={() => handleOpenModal(product)}
                            >
                              <div className="button-content">
                                <span className="button-text"> Edit</span>
                                <span className="icon__wrapper">
                                  <FaEdit className="react__icon" />
                                </span>
                              </div>
                            </button>

                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => handleDeleteProduct(product._id)}
                            >
                              <div className="button-content">
                                <span className="button-text"> Delete</span>
                                <span className="icon__wrapper">
                                  <TbTrashFilled className="react__icon" />
                                </span>
                              </div>
                            </button>
                          </>
                        )}
                      </>
                    )}
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleViewReport(product._id)}
                    >
                      <div className="button-content">
                        <span className="button-text"> View Stats</span>
                        <span className="icon__wrapper">
                          <BsBarChartLineFill className="react__icon" />
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          </div>
        ))}

        {project.isActive === true && (
          <ClickHandler setLat={setLat} setLon={setLon} />
        )}
      </MapContainer>
      {isModalOpen && (
        <div
          style={{
            margin: "5px auto",
          }}
          className="modal fade"
          id="staticBackdrop"
          data-backdrop="static"
          data-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="staticBackdropLabel">
                  Edit {selectedProduct.productName}
                </h5>

                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={handleCloseModal}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="form-group">
                  <label htmlFor="prdName">Product Name</label>
                  <input
                    type="text"
                    value={productName}
                    className="form-control"
                    id="prdName"
                    onChange={evt => setProductName(evt.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="peakPower">Peek Power</label>
                  <input
                    type="text"
                    className="form-control"
                    id="peakPower"
                    value={peakPower}
                    onChange={evt => setPeakPower(evt.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="area">Area</label>
                  <input
                    type="text"
                    className="form-control"
                    id="area"
                    value={area}
                    onChange={evt => setArea(evt.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="orientation">Orientation</label>
                  <select
                    id="orientation"
                    className="form-control"
                    value={orientation}
                    onChange={evt => setOrientation(evt.target.value)}
                  >
                    <option defaultValue value="">
                      Please choose orientation
                    </option>
                    <option value="N">N</option>
                    <option value="S">S</option>
                    <option value="E">E</option>
                    <option value="W">W</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="tilt">Tilt Angle</label>
                  <select
                    className="form-control"
                    id="tilt"
                    value={tilt}
                    onChange={evt => setTilt(evt.target.value)}
                  >
                    <option defaultValue value="">
                      Please select angle of inclination
                    </option>
                    <option value="0">0&deg;</option>
                    <option value="10">10&deg;</option>
                    <option value="20">20&deg;</option>
                    <option value="30">30&deg;</option>
                    <option value="40">40&deg;</option>
                    <option value="50">50&deg;</option>
                    <option value="60">60&deg;</option>
                    <option value="70">70&deg;</option>
                    <option value="80">80&deg;</option>
                    <option value="90">90&deg;</option>
                  </select>
                </div>
                <div className="form-group">
                  <label htmlFor="lon">Longitude</label>
                  <input
                    type="text"
                    id="lon"
                    value={lon}
                    onChange={evt => setLon(evt.target.value)}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lat">Latitude</label>
                  <input
                    type="text"
                    id="lat"
                    value={lat}
                    className="form-control"
                    onChange={evt => setLat(evt.target.value)}
                  />
                </div>
              </div>
              <div className="modal-footer mb-8">
                <button
                  type="button"
                  className="btn btn-warning btn-sm"
                  data-dismiss="modal"
                  onClick={handleCloseModal}
                >
                  Close
                </button>
                <button
                  type="button"
                  className="btn btn-primary btn-sm"
                  onClick={handleProductUpdate}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {addProductModal && (
        <AddProductModal
          project={project}
          onClose={handleAddProductModalClose}
          latitude={lat}
          longitude={lon}
        />
      )}
    </div>
  );
};

export default Map;
