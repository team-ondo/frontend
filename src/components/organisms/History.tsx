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
  const [dataTempMax, setDataTempMax] = useState<number[]>([]);
  const [dataTempMin, setDataTempMin] = useState<number[]>([]);
  const [dataHumidMax, setDataHumidMax] = useState<number[]>([]);
  const [dataHumidMin, setDataHumidMin] = useState<number[]>([]);
  const [dataLabels, setDataLabels] = useState<string[]>([]);

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

    // TODO
    const res = await fetch(
      `${url}/device-data/${device_id}/historical/week`,
      options
    );
    const data = await res.json();
    console.log("data: ", data);

    const tempMax: number[] = [];
    const tempMin: number[] = [];
    const humidMax: number[] = [];
    const humidMin: number[] = [];
    const label: string[] = [];

    data.forEach((day: any) => {
      tempMax.push(day.max_temp);
      tempMin.push(day.min_temp);
      humidMax.push(day.max_humid);
      humidMin.push(day.min_humid);
      label.push(day.date);
    });

    setDataTempMax(tempMax);
    setDataTempMin(tempMin);
    setDataHumidMax(humidMax);
    setDataHumidMin(humidMin);
    setDataLabels(label);
  };

  useEffect(() => {
    weekButtonHandler();
  }, []);

  // TODO change to actual dates from API - maybe convert dates to weekday
  const labels = dataLabels;

  const data_temp = {
    labels,
    datasets: [
      {
        label: "Max",
        data: dataTempMax,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: 1,
      },
      {
        label: "Min",
        data: dataTempMin,
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
        data: dataHumidMax,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: 1,
      },
      {
        label: "Min",
        data: dataHumidMin,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
        fill: true,
      },
    ],
  };

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

// data example - array of objects
// date: "2022/09/18";
// max_humid: 72;
// max_temp: 31.7;
// min_humid: 60;
// min_temp: 25.6;
