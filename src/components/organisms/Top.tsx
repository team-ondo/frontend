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

export type LivaData = {
  temperature_celsius: number;
  humidity: number;
}

type Props = {
  deviceId: string | null;
}

export default function Top({deviceId}: Props) {
  const [currTemp, setCurrTemp] = useState<number | null>();
  const [currHumid, setCurrHumid] = useState<number | null>();
  const [weatherData, setWeatherData] = useState<WeatherData | null>();
  const [liveData, setLiveData] = useState<LivaData | null>();

  // ToDO -> implement catch
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/weather-info/en/${deviceId}`)
      .then((res) => {
        setWeatherData(res.data);
      });

    // live data
    axios
    .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/device-data/${deviceId}/live`)
    .then((res) => {
      setLiveData(res.data);
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
        {liveData ? (
          <Livedata temperature_celsius={liveData.temperature_celsius} humidity={liveData.humidity} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
