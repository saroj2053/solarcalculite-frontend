import React from "react";
import { Bar } from "react-chartjs-2";

// eslint-disable-next-line
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ chartData }) => {
  const handleResize = () => {};
  return (
    <>
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            onResize: handleResize,
            animation: { duration: 2000, easing: "easeInOutQuart" },
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>
    </>
  );
};

export default BarChart;
