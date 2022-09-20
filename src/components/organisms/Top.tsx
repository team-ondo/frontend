import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Top.module.scss";
import Weather from "@/components/molecules/Weather";
import Livedata from "./Livedata";
import axios from "axios";

export default function Top() {
  const [currTemp, setCurrTemp] = useState<number | null>();
  const [currHumid, setCurrHumid] = useState<number | null>();
  const [deviceId, setDeviceId] = useState<number | null>(1);
  const [data, setData] = useState<any>([]);

  useEffect(() => {
    setCurrTemp(35.2);
    setCurrHumid(68);
    setDeviceId(1);
  }, []);

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/weather-info/en/${deviceId}`)
      .then((res) => {
        setData(res.data);
      });
  }, [deviceId]);

  return (
    <div className={styles.top}>
      <div className={styles.top__inner}>
        {data ? <Weather data={data} /> : <></>}
        {currTemp && currHumid ? (
          <Livedata currTemp={currTemp} currHumid={currHumid} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
