import React, { useState, useEffect } from "react";
import BarChart from "../../components/BarChart/BarChart";
import { useLocation, useNavigate } from "react-router-dom";
const Report = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { productData } = location.state || {};

  const [electricityData, setElectricityData] = useState([]);
  useEffect(() => {
    if (
      productData &&
      productData.solarCalculiteResults &&
      productData.solarCalculiteResults.length > 0
    ) {
      setElectricityData(productData.solarCalculiteResults);
    } else if (!productData?.productName) {
      navigate("/projects");
    }
  }, [productData, navigate]);

  const elecData = {
    labels: electricityData?.map(data => data.date),
    datasets: [
      {
        label: `Electricity Generated by ${productData?.productName}`,
        data: electricityData.map(data => data?.electricity_produced),
        backgroundColor: "rgb(249, 229, 200)",
      },
    ],
  };

  return (
    <div>
      <button
        className="btn btn-secondary btn-sm mt-5"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
      <div className="mt-5">
        <BarChart chartData={elecData} />
      </div>
    </div>
  );
};

export default Report;
