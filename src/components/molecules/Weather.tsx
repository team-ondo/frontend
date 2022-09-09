import React, { useState, useEffect } from "react";
import styles from "@/styles/components/molecules/Weather.module.scss";

export default function Weather() {
  const [lat, setLat] = useState<number | null>();
  const [long, setLong] = useState<number | null>();
  const [data, setData] = useState<any>([]);
  const [day, setDay] = useState<string>("");

  const WEATHER_URL = "https://api.openweathermap.org/data/2.5/weather";

  useEffect(() => {
    const date = new Date();
    const dayOfWeek = date.getDay();
    const dayOfWeekStr = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const year = date.getFullYear();
    setDay(`${dayOfWeekStr[dayOfWeek]}, ${month}/${day}/${year}`);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setLat(35.6579702);
      setLong(139.7276486);

      await fetch(
        `${WEATHER_URL}?lat=${lat}&lon=${long}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
      )
        .then((res) => res.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
    };
    fetchData();

    console.log("Latitude is:", lat);
    console.log("Longitude is:", long);
  }, [lat, long]);

  return (
    <div className={styles.weather}>
      {typeof data.main != "undefined" ? (
        <>
          <p className={styles.weather__location}>{data.name}</p>
          <p className={styles.weather__date}>{day}</p>
          <p className={styles.weather__temperature}>
            {data.main.temp}&#x2103;
          </p>
          <p className={styles.weather__humidity}>{data.main.humidity}%</p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            width={40}
            height={40}
            alt=""
          />
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
