import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Error.css";

function Error() {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(-1);
  };
  return (
    <>
      <div className="errorPage">
        <h1 className="errorTitle">404</h1>
        <h2 className="errorSubTitle">WE ARE SORRY, PAGE NOT FOUND!</h2>
        <p className="errorDesc">
          The page you are looking for might have been removed, had its name
          changed or is temporarily unavailable.
        </p>
        <button className="btn btn-warning btn-lg">
          <Link className="errorLink" onClick={handleClick}>
            Go Back
          </Link>
        </button>
      </div>
    </>
  );
}

export default Error;
