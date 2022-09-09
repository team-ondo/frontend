import React, { useState, useEffect } from "react";
import styles from "@/styles/components/molecules/Weather.module.scss";
import axios from "axios";

export default function Weather() {
  const [lat, setLat] = useState<number | null>();
  const [long, setLong] = useState<number | null>();
  const [data, setData] = useState<any>([]);

  const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(() => {
    setLat(35.6579702);
    setLong(139.7276486);
    console.log("Latitude is:", lat);
    console.log("Longitude is:", long);

    const url = `${WEATHER_URL}?lat=35.6579702&lon=139.7276486&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`;
    axios.get(url).then((res) => {
      setData(res.data);
    });
  }, [lat, long]);

  if (!data) return null;

  console.log(data);

  return (
    <div className={styles.weather}>
      {typeof data != "undefined" ? (
        <>
          <p className={styles.weather__location}>{data.name}</p>
          <p className={styles.weather__date}>Thursday, 9/8/2022</p>
          <p className={styles.weather__temperature}>
            {data.main.temp}&#x2103;
          </p>
          <p className={styles.weather__humidity}>{data.main.humidity}%</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} width={40} height={40} alt="" />
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
