import React, { useEffect, useState } from "react";
import "./Profile.css";
import { deleteProfile, profile } from "../../api/userApi";

import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader/Loader";

import { SiNamecheap, SiNamebase } from "react-icons/si";
import { MdEmail } from "react-icons/md";
import { TiUserDelete } from "react-icons/ti";
import { FaUserEdit } from "react-icons/fa";

import avatar from "../../images/6596121.png";
import HomeLayout from "../../layout/HomeLayout/HomeLayout";
import useAuthUserStore from "../../store/userStore";

function Profile() {
  const { authUser, setAuthUser } = useAuthUserStore();
  const [userDetails, setUserDetails] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function getUserDetails() {
      try {
        setLoading(true);
        const userResponse = await profile();
        if (userResponse.status === 200) {
          setUserDetails(userResponse.data.user);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUserDetails();
  }, []);

  const handleDeleteUser = async () => {
    const deleteResponse = await deleteProfile();
    if (deleteResponse.status === 200) {
      setAuthUser(null);
      localStorage.removeItem("auth");

      navigate("/");
    }
  };

  return (
    <HomeLayout>
      {loading ? (
        <Loader text="Profile Details" />
      ) : (
        <div className="profile">
          <div className="profile__details">
            <h1 className="profile__header">My Profile</h1>
            <img className="mb-5 profile__icon" src={avatar} alt="user" />
            <div className="textWrapper mb-5">
              <div className="icon">
                <SiNamecheap />
              </div>
              <div className="detailUser">
                <span className="profile__email">
                  <strong>{userDetails.name}</strong>
                </span>
              </div>
            </div>
            <div className="textWrapper mb-5">
              <div className="icon">
                <SiNamebase />
              </div>
              <div className="detailUser">
                <span className="profile__email">
                  <strong>{userDetails.username}</strong>
                </span>
              </div>
            </div>
            <div className="textWrapper mb-5">
              <div className="icon">
                <MdEmail />
              </div>
              <div className="detailUser">
                <span className="profile__email">
                  <strong>{userDetails.email}</strong>
                </span>
              </div>
            </div>
            <div className="profile__controls">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => navigate("/profile/edit")}
              >
                <div className="button-content">
                  <span className="button-text"> Update Profile</span>
                  <span className="icon__wrapper">
                    <FaUserEdit className="react__icon" />
                  </span>
                </div>
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={handleDeleteUser}
                disabled
              >
                <div className="button-content">
                  <span className="button-text"> Delete Account</span>
                  <span className="icon__wrapper">
                    <TiUserDelete className="react__icon" />
                  </span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </HomeLayout>
  );
}

export default Profile;
