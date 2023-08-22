import React, { useState } from "react";
import "./ProfileEdit.css";
import { useAuth } from "../../context/AuthContext";
import { updateProfile } from "../../api/userApi";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import avatar from "../../images/6596121.png";
function ProfileEdit() {
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  let [name, setName] = useState(auth.user.name);
  let [username, setUsername] = useState(auth.user.username);
  let [email, setEmail] = useState(auth.user.email);

  const data = { name, username, email };

  const handleProfileUpdate = async evt => {
    evt.preventDefault();

    try {
      const updateResponse = await updateProfile(data);
      if (updateResponse.status === 200) {
        setAuth({ user: updateResponse.data.user, token: auth.token });
        navigate("/profile");
      } else if (updateResponse.code === "ERR_BAD_REQUEST") {
        toast.error(updateResponse.response.data.message);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button
        className="btn btn-secondary btn-sm mt-3"
        onClick={() => navigate("/profile")}
      >
        Go Back
      </button>
      <div className="profileUpdate">
        <div className="profileUpdateHeader"> Update Profile </div>
        <ToastContainer theme="dark" />
        <form
          action=""
          className="profileUpdateForm"
          onSubmit={handleProfileUpdate}
        >
          <div className="form-group">
            <img src={avatar} alt="user icon" />
          </div>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              value={name}
              onChange={evt => setName(evt.target.value)}
              className="form-control"
              id="name"
              name="name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              value={username}
              onChange={evt => setUsername(evt.target.value)}
              className="form-control"
              id="username"
              name="username"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              value={email}
              onChange={evt => setEmail(evt.target.value)}
              className="form-control"
              id="email"
              name="email"
            />
          </div>
          <button
            className="btn btn-primary btn-sm submitBtn"
            onClick={handleProfileUpdate}
          >
            Update Profile
          </button>
        </form>
      </div>
    </>
  );
}

export default ProfileEdit;
