import React from "react";
import styles from "@/styles/components/organisms/Livedata.module.scss";
import { ArcElement } from "chart.js";
import Chart from "chart.js/auto";
import { Doughnut } from "react-chartjs-2";

export default function Livedata() {
  Chart.register(ArcElement);

  const tempData = {
    labels: ["Temperature", "Blue"],
    datasets: [
      {
        label: "Temperature",
        data: [29.2, 20.8],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
    options: {
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  };

  const humidData = {
    labels: ["Humidity", "Blue"],
    datasets: [
      {
        label: "Temperature",
        data: [68, 32],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className={styles.livedata}>
      <div className={styles.temperature}>
        <h2>Temperature</h2>
        <div>
          <Doughnut height={300} width={300} data={tempData} id="temp-chart" />
        </div>
      </div>
      <div className={styles.humidity}>
        <h2>Humidity</h2>
        <div>
          <Doughnut
            height={300}
            width={300}
            data={humidData}
            id="humid-chart"
          />
        </div>
      </div>
    </div>
  );
}
