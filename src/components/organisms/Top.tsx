import React from "react";
import styles from "@/styles/components/organisms/Top.module.scss";
import Weather from "@/components/molecules/Weather";
import Livedata from "./Livedata";

export default function Top() {
  return (
    <div className={styles.top}>
      <div className={styles.top__inner}>
        <Weather />
        <Livedata />
      </div>
    </div>
  );
}
