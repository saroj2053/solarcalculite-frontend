import React from "react";
import "./Success.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const [user] = useAuth();
  const navigate = useNavigate();

  return (
    <>
      <div className="jumbotron mt-5">
        <h1>Hello, {user.user.name}!</h1>
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
    </>
  );
};

export default Success;
