import React, { useState, useEffect } from "react";
import styles from "@/styles/components/molecules/Weather.module.scss";

type WeatherData = {
  location_name: string;
  temperature_c: number;
  temperature_f: number;
  humidity: number;
  weather_icon: string;
};

export default function Weather({
  location_name,
  temperature_c,
  temperature_f,
  humidity,
  weather_icon,
}: WeatherData) {
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
      "May.",
      "June.",
      "July.",
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

  const WEATHER_ICON_URL = weather_icon
    ? `http://openweathermap.org/img/wn/${weather_icon}.png`
    : "";

  return (
    <div className={styles.weather}>
      {typeof data != "undefined" ? (
        <>
          <div className={styles.location__info}>
            <p className={styles.weather__location}>{location_name}</p>
            <p className={styles.weather__date}>{day}</p>
          </div>
          <div className={styles.location__data}>
            <p className={styles.weather__temperature}>
              {temperature_c}&#x2103;
            </p>
            <p className={styles.weather__humidity}>{humidity}%</p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={WEATHER_ICON_URL} width={50} height={50} alt="" />
          </div>
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
}
