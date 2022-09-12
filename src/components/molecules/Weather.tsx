import React, { useState, useEffect } from "react";
import styles from "@/styles/components/molecules/Weather.module.scss";
import axios from "axios";

type Props = {
  lat: number | null;
  long: number | null;
};

export default function Weather(props: Props) {
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
    axios
      .get(
        `${WEATHER_URL}?lat=${props.lat}&lon=${props.long}&units=metric&appid=${process.env.NEXT_PUBLIC_WEATHER_API}`
      )
      .then((res) => {
        setData(res.data);
      });
  }, [props.lat, props.long]);

  console.log("Latitude is:", props.lat);
  console.log("Longitude is:", props.long);

  return (
    <div className={styles.weather}>
      {typeof data.main != "undefined" ? (
        <>
          <div className={styles.location__info}>
            <p className={styles.weather__location}>{data.name}</p>
            <p className={styles.weather__date}>{day}</p>
          </div>
          <div className={styles.location__data}>
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
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
