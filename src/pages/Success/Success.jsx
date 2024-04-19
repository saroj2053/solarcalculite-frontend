import React from "react";
import "./Success.css";
import { useNavigate } from "react-router-dom";
import HomeLayout from "../../layout/HomeLayout/HomeLayout";
import useAuthUserStore from "../../store/userStore";

const Success = () => {
  const { authUser } = useAuthUserStore();
  const navigate = useNavigate();

  return (
    <HomeLayout>
      <div className="jumbotron mt-5">
        <h1>Hello, {authUser.user.name}!</h1>
        <p>
          The data has been generated and is sent to your registered email
          address.
        </p>
        <hr className="my-6" />
        <button
          className="btn btn-secondary btn-sm"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      </div>
    </HomeLayout>
  );
};

export default Success;
