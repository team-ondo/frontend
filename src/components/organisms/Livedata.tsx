import React from "react";
import styles from "@/styles/components/organisms/Livedata.module.scss";

export default function Livedata() {
  return (
    <div className={styles.livedata}>
      <div className={styles.temperature}>
        <h2>Temperature</h2>
        <div>29.2</div>
      </div>
      <div className={styles.humidity}>
        <h2>Humidity</h2>
        <div>68</div>
      </div>
    </div>
  );
}
