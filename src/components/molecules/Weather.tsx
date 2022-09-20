import React, { useState, useEffect } from "react";
import styles from "@/styles/components/molecules/Weather.module.scss";
import axios from "axios";

type Props = {
  deviceId: number;
};

export default function Weather({ deviceId }: Props) {
  const [data, setData] = useState<any>([]);
  const [day, setDay] = useState<string>("");

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
    const months = [
      "Jan.",
      "Feb.",
      "Mar.",
      "Apr.",
      "May",
      "June",
      "July",
      "Aug.",
      "Sept.",
      "Oct.",
      "Nov.",
      "Dec.",
    ];

    const month = months[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    setDay(`${dayOfWeekStr[dayOfWeek]}, ${month} ${day}, ${year}`);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/weather-info/en/${deviceId}`)
      .then((res) => {
        setData(res.data);
      });
  }, [deviceId]);

  const WEATHER_URL = data.weather_icon ? `http://openweathermap.org/img/wn/${data.weather_icon}.png` : "";
  
  return (
    <div className={styles.weather}>
      {typeof data != "undefined" ? (
        <>
          <div className={styles.location__info}>
            <p className={styles.weather__location}>{data.location_name}</p>
            <p className={styles.weather__date}>{day}</p>
          </div>
          <div className={styles.location__data}>
            <p className={styles.weather__temperature}>
              {data.temperature_c}&#x2103;
            </p>
            <p className={styles.weather__humidity}>{data.humidity}%</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={WEATHER_URL}
              width={50}
              height={50}
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
