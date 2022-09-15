import React from "react";

// TS check

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// 'not a function' - chart.js version issue?

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Test",
    },
  },
};

const labels = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Max",
      // map here
      data: [34, 30, 28, 28, 30, 29, 25],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    },
    {
      label: "Min",
      // map here
      data: [20, 21, 22, 25, 23, 18, 16],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
    },
  ],
};

export default function History() {
  return (
    <div style={{ paddingTop: "100px", width: "600px", margin: "0 auto" }}>
      <Line options={options} data={data} />
    </div>
  );
}
