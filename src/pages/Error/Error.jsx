import React from "react";
import { Link } from "react-router-dom";
import "./Error.css";
function Error() {
  return (
    <div className="errorPage">
      <h1 className="errorTitle">404</h1>
      <h2 className="errorDesc">WE ARE SORRY, PAGE NOT FOUND!</h2>
      <p>
        The page you are looking for might have been removed had its name
        changed or is temporarily unavailable.
      </p>
      <button className="btn btn-primary btn-sm">
        <Link className="errorLink" to="/">
          BACK TO HOMEPAGE
        </Link>
      </button>
    </div>
  );
}

export default Error;
