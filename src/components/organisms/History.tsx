import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import styles from "@/styles/components/organisms/History.module.scss";
import AlarmHistory from "./AlarmHistory";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

export const options_temp = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Test Temperature (C)",
    },
  },
};

export const options_hum = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Test Humidity (%)",
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

export const data_temp = {
  labels,
  datasets: [
    {
      label: "Max",
      // map here
      data: [34, 30, 28, 28, 30, 29, 25],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      fill: 1,
    },
    {
      label: "Min",
      // map here
      data: [20, 21, 22, 25, 23, 18, 16],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      fill: true,
    },
  ],
};

export const data_hum = {
  labels,
  datasets: [
    {
      label: "Max",
      // map here
      data: [82, 80, 78, 81, 75, 83, 74],
      borderColor: "rgb(255, 99, 132)",
      backgroundColor: "rgba(255, 99, 132, 0.5)",
      fill: 1,
    },
    {
      label: "Min",
      // map here
      data: [72, 76, 75, 73, 71, 81, 72],
      borderColor: "rgb(53, 162, 235)",
      backgroundColor: "rgba(53, 162, 235, 0.5)",
      fill: true,
    },
  ],
};

export default function History() {
  return (
    <>
      <div className={styles.top}>
        <div className={styles.top__inner}>
          <nav className={styles["chart-navigation"]}>
            <button className={styles["chart-button"]}>Day</button>
            <button className={styles["chart-button"]}>Week</button>
            <button className={styles["chart-button"]}>Month</button>
          </nav>
          <div className={styles.history}>
            <div className={styles.temperature}>
              <div className={styles.history__line}>
                <Line options={options_temp} data={data_temp} />
              </div>
            </div>
            <div className={styles.humidity}>
              <div className={styles.history__line}>
                <Line options={options_hum} data={data_hum} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles["alarm-history-container"]}>
        <AlarmHistory />
      </div>
    </>
  );
}
