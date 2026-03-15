import React from "react";
import Chart from "react-apexcharts";

const PatientGraph = ({ score }) => {

  const safeScore = Number(score) || 0;

  let color = "#22c55e";

  if (safeScore < 25) {
    color = "#ef4444";
  } else if (safeScore < 50) {
    color = "#f97316";
  } else if (safeScore < 75) {
    color = "#eab308";
  }

  const options = {
    chart: {
      type: "radialBar",
      toolbar: { show: false }
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: "65%"
        },
        track: {
          background: "#1f2937"
        },
        dataLabels: {
          name: {
            show: true,
            color: "#9ca3af",
            fontSize: "20px"
          },
          value: {
            fontSize: "28px",
            color: "#ffffff"
          }
        }
      }
    },
    labels: ["Wellness"],
    colors: [color]
  };

  const series = [safeScore];

  return (
    <div className="w-100 h-100">
      <Chart
        key={safeScore}
        options={options}
        series={series}
        type="radialBar"
        height={300}
      />
    </div>
  );
};

export default PatientGraph;