import React, { useState } from "react";
import { createProduct } from "../../api/productApi";

function AddProductModal({ handleCloseModal, project }) {
  const [productName, setProductName] = useState("");
  const [peekPower, setPeekPower] = useState("");
  const [area, setArea] = useState("");
  const [orientation, setOrientation] = useState("");
  const [tilt, setTilt] = useState("");
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");

  const data = {
    productName,
    peekPower,
    area,
    orientation,
    tilt,
    lon,
    lat,
    projectId: project._id,
  };

  console.log(data);
  const handleSubmit = async () => {
    try {
      const res = await createProduct(data);
      if (res.status === 201) {
        window.location = `/project/${project._id}`;
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div
        style={{
          height: "100%",
          width: "100%",
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
                Add Product
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
                <label htmlFor="name">Product Name</label>
                <input
                  type="text"
                  value={productName}
                  className="form-control"
                  id="name"
                  placeholder="Enter product name"
                  onChange={evt => setProductName(evt.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="name">Peek Power</label>
                <input
                  type="number"
                  value={peekPower}
                  className="form-control"
                  placeholder="Product's peak power here"
                  min={1}
                  onChange={evt => setPeekPower(evt.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="area">Area</label>
                <input
                  type="number"
                  value={area}
                  className="form-control"
                  placeholder="Enter area in (sq. m.)"
                  min={0}
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
                  value={lon}
                  id="lon"
                  className="form-control"
                  onChange={evt => setLon(evt.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lat">Latitude</label>
                <input
                  type="text"
                  value={lat}
                  id="lat"
                  className="form-control"
                  onChange={evt => setLat(evt.target.value)}
                />
              </div>
              <small id="infoHelp" className="form-text text-muted">
                This will be added to {project.title}
              </small>
              <p></p>
            </div>
            <div className="modal-footer">
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
                onClick={handleSubmit}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddProductModal;
