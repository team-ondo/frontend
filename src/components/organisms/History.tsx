import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "@/styles/components/organisms/History.module.scss";
import AlarmHistory from "./AlarmHistory";
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
      text: "Temperature (C)",
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
      text: "Humidity (%)",
    },
  },
};

export default function History() {
  // STATE
  const [dataTempMax, setDataTempMax] = useState([]);
  const [dataTempMin, setDataTempMin] = useState([]);
  const [dataHumidMax, setDataHumidMax] = useState([]);
  const [dataHumidMin, setDataHumidMin] = useState([]);
  const [dataLabels, setDataLabels] = useState([]);

  // FETCH WEEK HELPER
  const weekButtonHandler = async () => {
    const url = "https://ondo-backend-test.onrender.com";
    const device_id = "a7382f5c-3326-4cf8-b717-549affe1c2eb";

    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const res = await fetch(
      `${url}/device-data/${device_id}/historical/week`,
      options
    );
    const data = await res.json();

    console.log("data: ", data);
  };

  // TODO change to actual dates from API - maybe convert dates to weekday
  const labels = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const data_temp = {
    labels,
    datasets: [
      {
        label: "Max",
        data: [34, 30, 28, 28, 30, 29, 25],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: 1,
      },
      {
        label: "Min",
        data: [20, 21, 22, 25, 23, 18, 16],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: true,
      },
    ],
  };

  const data_hum = {
    labels,
    datasets: [
      {
        label: "Max",
        data: [82, 80, 78, 81, 75, 83, 74],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: 1,
      },
      {
        label: "Min",
        data: [72, 76, 75, 73, 71, 81, 72],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: true,
      },
    ],
  };

  useEffect(() => {
    const data = weekButtonHandler();
  }, []);

  return (
    <>
      <div className={styles.top}>
        <div className={styles.top__inner}>
          <nav className={styles["chart-navigation"]}>
            <button className={styles["chart-button"]}>Day</button>
            <button
              className={styles["chart-button"]}
              onClick={weekButtonHandler}
            >
              Week
            </button>
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
