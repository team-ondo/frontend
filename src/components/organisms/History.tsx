import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import styles from "@/styles/components/organisms/History.module.scss";
import AlarmHistory from "./AlarmHistory";
import api from "../../lib/axios_settings";
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

const options_temp = {
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

const options_hum = {
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

  const device_id = "a7382f5c-3326-4cf8-b717-549affe1c2eb";

  type DeviceData = {
    max_temp: number;
    min_temp: number;
    max_humid: number;
    min_humid: number;
    date: string;
  };

  const updateDataState = (deviceDataSet: DeviceData[]) => {
    const tempMax: number[] = [];
    const tempMin: number[] = [];
    const humidMax: number[] = [];
    const humidMin: number[] = [];
    const label: string[] = [];

    deviceDataSet.forEach((deviceData: DeviceData) => {
      tempMax.push(deviceData.max_temp);
      tempMin.push(deviceData.min_temp);
      humidMax.push(deviceData.max_humid);
      humidMin.push(deviceData.min_humid);
      label.push(deviceData.date);
    });

    setDataTempMax(tempMax);
    setDataTempMin(tempMin);
    setDataHumidMax(humidMax);
    setDataHumidMin(humidMin);
    setDataLabels(label);
  };

  // FETCH DAY HELPER
  const dayButtonHandler = async () => {
    // TODO implement catch
    api.get(`/device-data/${device_id}/historical/day`).then((res) => {
      let historicalData = res.data;
      updateDataState(historicalData);
    });
  };

  // FETCH WEEK HELPER
  const weekButtonHandler = async () => {
    // TODO implement catch
    api.get(`/device-data/${device_id}/historical/week`).then((res) => {
      let historicalData = res.data;
      updateDataState(historicalData);
    });
  };

  // FETCH MONTH HELPER
  const monthButtonHandler = async () => {
    // TODO implement catch
    api.get(`/device-data/${device_id}/historical/month`).then((res) => {
      let historicalData = res.data;

      updateDataState(historicalData);
    });
  };

  // load week by default
  useEffect(() => {
    weekButtonHandler();
  }, []);

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
            <button
              className={styles["chart-button"]}
              onClick={dayButtonHandler}
            >
              Day
            </button>
            <button
              className={styles["chart-button"]}
              onClick={weekButtonHandler}
            >
              Week
            </button>
            <button
              className={styles["chart-button"]}
              onClick={monthButtonHandler}
            >
              Month
            </button>
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
