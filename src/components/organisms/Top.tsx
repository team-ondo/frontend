import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Top.module.scss";
import Weather from "@/components/molecules/Weather";
import Livedata from "./Livedata";

export default function Top() {
  const [currTemp, setCurrTemp] = useState<number | null>();
  const [currHumid, setCurrHumid] = useState<number | null>();
  const [deviceId, setDeviceId] = useState<number | null>(1);

  useEffect(() => {
    setCurrTemp(35.2);
    setCurrHumid(68);
    setDeviceId(1);
  }, []);

  return (
    <div className={styles.top}>
      <div className={styles.top__inner}>
        {deviceId ? <Weather deviceId={deviceId} /> : <></>}
        {currTemp && currHumid ? (
          <Livedata currTemp={currTemp} currHumid={currHumid} />
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
