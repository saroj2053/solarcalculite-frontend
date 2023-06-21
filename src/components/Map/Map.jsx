import React, { useState, useEffect } from "react";
import { Icon } from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import logoForMarker from "../../images/marker-icon-custom.png";
import "./Map.css";
import { deleteProduct, updateProduct } from "../../api/productApi";
import { useParams } from "react-router-dom";

const Map = ({ products }) => {
  const appLogo = new Icon({
    iconUrl: logoForMarker,
    iconSize: [50, 50],
  });

  const params = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mapProducts, setMapProducts] = useState(products);
  const [selectedProduct, setSelectedProduct] = useState({});

  const [productName, setProductName] = useState("");
  const [peekPower, setPeekPower] = useState("");
  const [area, setArea] = useState("");
  const [orientation, setOrientation] = useState("");
  const [tilt, setTilt] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");

  useEffect(() => {
    setProductName(selectedProduct.productName);
    setPeekPower(selectedProduct.peekPower);
    setArea(selectedProduct.area);
    setOrientation(selectedProduct.orientation);
    setTilt(selectedProduct.tilt);
    setLon(selectedProduct.lon);
    setLat(selectedProduct.lat);
  }, [selectedProduct]);

  const data = {
    productName,
    peekPower,
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

  // const locations = products.map(loc => [loc.lat, loc.lon]);
  // const locations = [ [28.7041, 77.1025], [27.0008, 85.6538], [26.7271, 85.9407],
  //   [50.8282, 12.9209],
  // ];

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
    setMapProducts(products.filter(product => product._id !== id));
    if (deleteResponse.status === 200) {
      if (selectedProduct._id === id) {
        window.location = `/project/${params.id}`;
      }
    }
  };

  return (
    <div>
      <MapContainer
        className="map"
        center={
          mapProducts.length > 0
            ? [mapProducts[0].lat, mapProducts[0].lon]
            : [51.505, -0.09]
        }
        zoom={10}
        maxZoom={18}
        minZoom={4}
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

                  <p>Power Peak: {product.peekPower}mW</p>
                  <p>orientation: {product.orientation}</p>
                  <p>
                    inclination/tilt: ({product.tilt}
                    <sup>o</sup>)
                  </p>
                  <p>area: {product.area}</p>
                  <p>latitude:{product.lat}</p>
                  <p>longitude: {product.lon}</p>

                  <div className="product__controls">
                    <button className="btn btn-outline-success btn-sm">
                      Generate data
                    </button>
                    <button
                      type="button"
                      data-toggle="modal"
                      data-target="#staticBackdrop"
                      className="btn btn-outline-warning btn-sm"
                      onClick={() => handleOpenModal(product)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-outline-danger btn-sm"
                      onClick={() => handleDeleteProduct(product._id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </Popup>
            </Marker>
          </div>
        ))}
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
                  <label htmlFor="peekPower">Peek Power</label>
                  <input
                    type="text"
                    className="form-control"
                    id="peekPower"
                    value={peekPower}
                    onChange={evt => setPeekPower(evt.target.value)}
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
    </div>
  );
};

export default Map;
