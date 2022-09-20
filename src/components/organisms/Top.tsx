import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Top.module.scss";
import Weather from "@/components/molecules/Weather";
import Livedata from "./Livedata";
import axios from "axios";

export type WeatherData = {
  location_name: string;
  temperature_c: number;
  temperature_f: number;
  humidity: number;
  weather_icon: string;
};

export default function Top() {
  const [currTemp, setCurrTemp] = useState<number | null>();
  const [currHumid, setCurrHumid] = useState<number | null>();
  const [deviceId, setDeviceId] = useState<string | null>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>();

  useEffect(() => {
    setCurrTemp(35.2);
    setCurrHumid(68);
    setDeviceId("a7382f5c-3326-4cf8-b717-549affe1c2eb");
  }, []);

  // ToDO -> implement catch
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/weather-info/en/${deviceId}`)
      .then((res) => {
        setWeatherData(res.data);
      });
  }, [deviceId]);

  return (
    <div className={styles.top}>
      <div className={styles.top__inner}>
        {weatherData ? (
          <Weather
            location_name={weatherData.location_name}
            temperature_c={weatherData.temperature_c}
            temperature_f={weatherData.temperature_f}
            humidity={weatherData.humidity}
            weather_icon={weatherData.weather_icon}
          />
        ) : (
          <></>
        )}
        {currTemp && currHumid ? (
          <Livedata currTemp={currTemp} currHumid={currHumid} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
