import React, { useEffect, useState } from "react";
import "./Profile.css";
import { useAuth } from "../../context/AuthContext";
import { deleteProfile, profile } from "../../api/userApi";

import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

import { SiNamecheap, SiNamebase } from "react-icons/si";
import { MdEmail } from "react-icons/md";
// import { useTheme } from "../../context/ThemeContext";
import avatar from "../../images/6596121.png";

function Profile() {
  const [auth, setAuth] = useAuth();
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  // const darkTheme = useTheme();
  // const btnColor = darkTheme ? "btnDark" : "btnLight";

  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      const userResponse = await profile();
      if (userResponse.status === 200) {
        setUserDetails(userResponse.data.user);
      }
    }
    getUserDetails();
    setLoading(false);
  }, []);

  const handleDeleteUser = async () => {
    const deleteResponse = await deleteProfile();
    if (deleteResponse.status === 200) {
      setAuth({
        ...auth,
        user: null,
        token: "",
      });
      localStorage.removeItem("auth");

      navigate("/signin");
    }
  };
  // need to be called from the backend

  return (
    <>
      {loading ? (
        <Loader text="Profile Details" />
      ) : (
        <div className="profile">
          <div className="profile__details">
            <h1 className="display-4">Profile Page</h1>
            <img
              style={{
                borderRadius: "50%",
                width: "100px",
                height: "100px",
                objectFit: "cover",
              }}
              className="img-thumbnail mb-3"
              src={avatar}
              alt="user"
            />
            <div className="textWrapper mb-3">
              <div className="icon">
                <SiNamecheap />
              </div>
              <div className="detailUser">
                <span className="profile__name">Name</span>
                <p>{userDetails.name}</p>
              </div>
            </div>
            <div className="textWrapper mb-3">
              <div className="icon">
                <SiNamebase />
              </div>
              <div className="detailUser">
                <span className="profile__username">Username</span>
                <p>{userDetails.username}</p>
              </div>
            </div>
            <div className="textWrapper mb-3">
              <div className="icon">
                <MdEmail />
              </div>
              <div className="detailUser">
                <span className="profile__email">Email</span>
                <p>{userDetails.email}</p>
              </div>
            </div>
          </div>

          <div className="controls">
            <button
              // className={`edit ${btnColor}`}
              className="btn btn-warning btn-sm"
              onClick={() => navigate("/profile/edit")}
            >
              Update Profile
            </button>
            {/* <button
              className="updatePassword"
              onClick={() => navigate("/updatePassword")}
            >
              Update Password
            </button> */}
            <button
              // className={`delete ${btnColor}`}
              className="btn btn-danger btn-sm"
              onClick={handleDeleteUser}
            >
              Deactivate this account
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Profile;
