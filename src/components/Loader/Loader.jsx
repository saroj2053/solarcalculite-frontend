import React from "react";
import { TailSpin } from "react-loader-spinner";
import "./Loader.css";

function Loader({ text }) {
  return (
    <div className="loaderWrapper">
      <h2>Loading {text}</h2>
      <TailSpin
        height="80"
        width="80"
        color="#2596be"
        ariaLabel="tail-spin-loading"
        radius="1"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
      />
    </div>
  );
}

export default Loader;
