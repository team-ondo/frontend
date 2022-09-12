import React from "react";
import styles from "@/styles/components/organisms/Livedata.module.scss";
import "chartjs-plugin-doughnutlabel";
import { Doughnut } from "react-chartjs-2";

type Props = {
  currTemp: number;
  currHumid: number;
};

export default function Livedata(props: Props) {

  const tempData = {
    labels: ["Temperature", ""],
    datasets: [
      {
        label: "Temperature",
        data: [props.currTemp, 50 - props.currTemp],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  const tempOption: any = {
    legend: {
      display: false,
    },
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: `${props.currTemp}℃`,
            color: "#666666",
            font: {
              size: 30,
            },
          },
        ],
      },
    },
  };

  const humidData = {
    labels: ["Humidity", ""],
    datasets: [
      {
        label: "Humidity",
        data: [props.currHumid, 100 - props.currHumid],
        backgroundColor: ["rgb(255, 99, 132)", "rgb(54, 162, 235)"],
        hoverOffset: 4,
        borderWidth: 0,
      },
    ],
  };

  const humidOption = {
    legend: {
      display: false,
    },
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: `${props.currHumid}%`,
            color: "#666666",
            font: {
              size: 30,
            },
          },
        ],
      },
    },
  }

  return (
    <div className={styles.livedata}>
      <div className={styles.temperature}>
        <h2>Temperature</h2>
        <div className={styles.livedata__doughnut}>
          <Doughnut
            height={400}
            width={400}
            data={tempData}
            options={tempOption}
            id="temp-chart"
          />
        </div>
      </div>
      <div className={styles.humidity}>
        <h2>Humidity</h2>
        <div className={styles.livedata__doughnut}>
          <Doughnut
            height={400}
            width={400}
            data={humidData}
            options={humidOption}
            id="humid-chart"
          />
        </div>
      </div>
    </div>
  );
}
