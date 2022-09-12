import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Top.module.scss";
import Weather from "@/components/molecules/Weather";
import Livedata from "./Livedata";

export default function Top() {
  const [lat, setLat] = useState<number | null>();
  const [long, setLong] = useState<number | null>();
  const [currTemp, setCurrTemp] = useState<number | null>();
  const [currHumid, setCurrHumid] = useState<number | null>();

  useEffect(() => {
    setLat(35.6579702);
    setLong(139.7276486);
    setCurrTemp(29.2);
    setCurrHumid(68);
  }, []);

  return (
    <div className={styles.top}>
      <div className={styles.top__inner}>
        {lat && long ? <Weather lat={lat} long={long} /> : <></>}
        {currTemp && currHumid ? (
          <Livedata currTemp={currTemp} currHumid={currHumid} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
