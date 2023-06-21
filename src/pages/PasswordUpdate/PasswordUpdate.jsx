import React, { useState } from "react";
import "./PasswordUpdate.css";

import { updatePassword } from "../../api/userApi";
import { useNavigate } from "react-router-dom";

function PasswordUpdate() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async evt => {
    evt.preventDefault();
    const data = {
      oldPassword: oldPassword,
      password: newPassword,
      confirmPassword: confirmPassword,
    };
    const response = await updatePassword(data);

    if (response.status === 200) {
      navigate("/profile");
    } else if (response.code === "ERR_BAD_REQUEST") {
      setError(response.response.data.message);
    }
  };
  console.log(oldPassword, newPassword, confirmPassword);

  return (
    <div className="passwordUpdate">
      <div className="passwordUpdateHeader"> Update Password </div>
      {error !== "" ? (
        <div
          style={{
            width: "50%",
            margin: "0 auto",
          }}
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          <p className="errorMessage">{error}</p>
          <button
            type="button"
            class="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      ) : (
        ""
      )}
      <form action="" className="passwordUpdateForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="password">Old Password</label>
          <input
            type="password"
            value={oldPassword}
            onChange={evt => setOldPassword(evt.target.value)}
            className="form-control"
            id="oldPassword"
            name="oldPassword"
          />
        </div>
        <div className="form-group">
          <label htmlFor="newPassword">New Password</label>
          <input
            type="password"
            value={newPassword}
            onChange={evt => setNewPassword(evt.target.value)}
            className="form-control"
            id="newPassword"
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={evt => setConfirmPassword(evt.target.value)}
            className="form-control"
            id="confirmPassword"
            name="confirmPassword"
          />
        </div>
        <button className="btn btn-primary" onClick={handleSubmit}>
          Update Password
        </button>
      </form>
    </div>
  );
}

export default PasswordUpdate;
