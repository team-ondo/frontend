import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Top.module.scss";
import Weather from "@/components/molecules/Weather";
import Livedata from "./Livedata";
import api from "@/lib/axios_settings";
import { useRecoilValue } from "recoil";
import { deviceIdState } from "@/globalStates/atoms/Auth";

export type WeatherData = {
  location_name: string;
  temperature_c: number;
  temperature_f: number;
  humidity: number;
  weather_icon: string;
};

export type LiveData = {
  temperature_celsius: number;
  humidity: number;
  alarm?: boolean;
  deviceName: string;
};

export default function Top() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>();
  const [liveData, setLiveData] = useState<LiveData | null>();
  const [weatherErrMessage, setWeatherErrMessage] = useState<string | null>();
  const [liveErrMessage, setLiveErrMessage] = useState<string | null>();
  const [alarmIsRinging, setAlarmIsRinging] = useState<boolean>(true);
  const [deviceName, setDeviceName] = useState<string | null>();
  const deviceId = useRecoilValue<string>(deviceIdState);

  useEffect(() => {
    // get device name
    // TODO impoement catch
    api.get(`/device-data/${deviceId}/device-name`).then((res) => {
      setDeviceName(res.data.device_name);
    });

    // weather data
    api
      .get(`/weather-info/en/${deviceId}`)
      .then((res) => {
        setWeatherErrMessage(null);
        setWeatherData(res.data);
      })
      .catch((error: any) => {
        // TODO Implement each status code
        setWeatherErrMessage("Failed to retrieve the weather data.");
      });

    // live data
    api
      .get(`/device-data/${deviceId}/live`)
      .then((res) => {
        setLiveErrMessage(null);
        setLiveData(res.data);
      })
      .catch((error: any) => {
        // TODO Implement each status code
        setLiveErrMessage(
          "Failed to retrieve the temperature and humidity data."
        );
      });

    // update Livedata every 2 minutes
    const updateLivedata = setInterval(() => {
      api
        .get(`/device-data/${deviceId}/live`)
        .then((res) => {
          setLiveErrMessage(null);
          setLiveData(res.data);
        })
        .catch((error: any) => {
          // TODO Implement each status code
          setLiveErrMessage(
            "Failed to retrieve the temperature and humidity data."
          );
        });
    }, 120000);
    return () => clearInterval(updateLivedata);
  }, []);

  // check alarm when liveData is updated
  // useEffect(() => {
  //   if (liveData?.alarm) {
  //     setAlarmIsRinging(true);
  //   } else {
  //     setAlarmIsRinging(false);
  //   }
  // }, [liveData]);

  const toggleAlarmHandler = async () => {
    // Ping server to switch alarm off
    // api.get(`/devices/${deviceId}/alarm/off`).then((res) => {
    //   let response = res.data;
    //   console.log(response);
    //   // reset local alarm status to false
    //   setAlarmIsRinging(false);
    // });
    setAlarmIsRinging(false);
  };

  return (
    <div className={styles.top}>
      <div className={styles.top__inner}>
        {alarmIsRinging && (
          <button
            className={styles["alarm-button"]}
            onClick={toggleAlarmHandler}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/icon_alarmRinging.png"
              width={30}
              height={30}
              alt="alarm ringing"
            />
            Alarm is Ringing | Please Click to Reset.
          </button>
        )}

        {weatherData ? (
          <Weather
            location_name={weatherData.location_name}
            temperature_c={weatherData.temperature_c}
            temperature_f={weatherData.temperature_f}
            humidity={weatherData.humidity}
            weather_icon={weatherData.weather_icon}
          />
        ) : weatherErrMessage ? (
          <div className={styles.top__weather}>{weatherErrMessage}</div>
        ) : (
          <div className={styles.top__weather}>Loading the weather data.</div>
        )}

        {liveData ? (
          <Livedata
            temperature_celsius={liveData.temperature_celsius}
            humidity={liveData.humidity}
            deviceName={deviceName ? deviceName : ""}
          />
        ) : liveErrMessage ? (
          <div className={styles.top__livedata}>{liveErrMessage}</div>
        ) : (
          <div className={styles.top__livedata}>Loading data.</div>
        )}
      </div>
    </div>
  );
}
