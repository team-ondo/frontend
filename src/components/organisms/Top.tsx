import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Top.module.scss";
import Weather from "@/components/molecules/Weather";
import Livedata from "./Livedata";

export default function Top() {
  const [lat, setLat] = useState<number | null>(0);
  const [long, setLong] = useState<number | null>(0);

  useEffect(() => {
    setLat(35.6579702);
    setLong(139.7276486);
  }, [lat, long]);

  return (
    <div className={styles.top}>
      <div className={styles.top__inner}>
        <Weather lat={lat} long={long}/>
        <Livedata />
      </div>
    </div>
  );
}
