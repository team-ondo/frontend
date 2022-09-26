import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Livedata.module.scss";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement } from "chart.js";
import { LiveData } from "@/components/organisms/Top";

Chart.register(ArcElement);

export default function Livedata({ temperature_celsius, humidity }: LiveData) {
  const [tempColor, setTempColor] = useState<
    CanvasGradient | "rgb(255, 99, 132)"
  >("rgb(255, 99, 132)");
  const [humidColor, setHumidColor] = useState<
    CanvasGradient | "rgb(255, 99, 132)"
  >("rgb(255, 99, 132)");

  useEffect(() => {
    const canvas = document.getElementById("temp-chart") as HTMLCanvasElement;
    const ctx = canvas?.getContext("2d");

    let gradient = ctx?.createLinearGradient(0, 0, 0, 450) as CanvasGradient;
    gradient?.addColorStop(0, "rgba(255, 0, 0, 0)");
    gradient?.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    gradient?.addColorStop(1, "rgba(255, 0,0, 0.5)");

    const canvasH = document.getElementById("humid-chart") as HTMLCanvasElement;
    const ctxH = canvasH?.getContext("2d");

    let gradientH = ctxH?.createLinearGradient(0, 0, 0, 450) as CanvasGradient;
    gradientH?.addColorStop(0, "rgba(255, 0, 0, 0)");
    gradientH?.addColorStop(0.5, "rgba(255, 0, 0, 0.25)");
    gradientH?.addColorStop(1, "rgba(255, 0,0, 0.5)");

    setTempColor(gradient);
    setHumidColor(gradientH);
  }, []);

  const tempData = {
    labels: ["Temperature", ""],
    datasets: [
      {
        label: "Temperature",
        data: [temperature_celsius, 50 - temperature_celsius],
        backgroundColor: [tempColor, "rgb(125, 125, 125, 0.25)"],
        hoverOffset: 0,
        borderWidth: 0,
      },
    ],
  };

  // const tempOption: any = {
  //   plugins: {
  //     legend: {
  //       display: false,
  //     },
  //     tooltip: {
  //       filter: function (a: { label: string }, data: any) {
  //         return a.label === "Temperature";
  //       },
  //     },
  //   },
  // };

  const tempPlugins: any = [
    {
      beforeDraw: function (chart: any) {
        let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        let fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#666666";
        let text = `${temperature_celsius}℃`,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  const humidData = {
    labels: ["Humidity", ""],
    datasets: [
      {
        label: "Humidity",
        data: [humidity, 100 - humidity],
        backgroundColor: [humidColor, "rgb(125, 125, 125, 0.25)"],
        hoverOffset: 0,
        borderWidth: 0,
      },
    ],
  };

  const humidOption: any = {
    plugins: {
      legend: {
        display: false,
      },
      // tooltip: {
      //   callbacks: {
      //     label: (context: any) => {
      //       console.log(context);
      //     },
      //   },
      // },
    },
  };

  const humidPlugins: any = [
    {
      beforeDraw: function (chart: any) {
        let width = chart.width,
          height = chart.height,
          ctx = chart.ctx;
        ctx.restore();
        let fontSize = (height / 160).toFixed(2);
        ctx.font = fontSize + "em sans-serif";
        ctx.textBaseline = "middle";
        ctx.fillStyle = "#666666";
        let text = `${humidity}%`,
          textX = Math.round((width - ctx.measureText(text).width) / 2),
          textY = height / 2;
        ctx.fillText(text, textX, textY);
        ctx.save();
      },
    },
  ];

  return (
    <div className={styles.livedata}>
      <div className={styles.temperature}>
        <h2>Temperature</h2>
        <div className={styles.livedata__doughnut}>
          <Doughnut
            height={400}
            width={400}
            data={tempData}
            // options={tempOption}
            plugins={tempPlugins}
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
            plugins={humidPlugins}
            id="humid-chart"
          />
        </div>
      </div>
    </div>
  );
}
