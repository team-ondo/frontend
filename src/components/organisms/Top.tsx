import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Top.module.scss";
import Weather from "@/components/molecules/Weather";
import Livedata from "./Livedata";
import api from "@/lib/axios_settings";

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
};

type Props = {
  deviceId: string | null;
};

export default function Top({ deviceId }: Props) {
  const [weatherData, setWeatherData] = useState<WeatherData | null>();
  const [liveData, setLiveData] = useState<LivaData | null>();

  useEffect(() => {
    // weather data
    api
      .get(`/weather-info/en/${deviceId}`)
      .then((res) => {
        setWeatherData(res.data);
      })
      .catch((error: any) => {
        setWeatherData(null);
      });

    // live data
    api
      .get(`/device-data/${deviceId}/live`)
      .then((res) => {
        setLiveData(res.data);
      })
      .catch((error: any) => {
        setLiveData(null);
      });
  }, [deviceId]);

  const updateLivedata = () => {
    api
      .get(`/device-data/${deviceId}/live`)
      .then((res) => {
        setLiveData(res.data);
      })
      .catch((error: any) => {
        setLiveData(null);
      });
  };

  // update Livedata every 2 minitues
  setInterval(updateLivedata, 120000);

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
          <div className={styles.top__weather}>
            Failed to retrieve the weather data.
          </div>
        )}
        {liveData ? (
          <Livedata
            temperature_celsius={liveData.temperature_celsius}
            humidity={liveData.humidity}
          />
        ) : (
          <div className={styles.top__livedata}>
            Failed to retrieve the temperature and humidity data.
          </div>
        )}
      </div>
    </div>
  );
}
