import React from "react";
import AlarmHistoryItem from "../molecules/AlarmHistoryItem";
import styles from "@/styles/components/organisms/AlarmHistory.module.scss";

const alarmData = [
  {
    date: "01/01/22",
    time: "14:22",
  },
  {
    date: "01/01/22",
    time: "14:22",
  },
  {
    date: "01/01/22",
    time: "14:22",
  },
  {
    date: "01/01/22",
    time: "14:22",
  },
  {
    date: "01/01/22",
    time: "14:22",
  },
  {
    date: "01/01/22",
    time: "14:22",
  },
  {
    date: "01/01/22",
    time: "14:22",
  },
  {
    date: "01/01/22",
    time: "14:22",
  },
  {
    date: "01/01/22",
    time: "14:22",
  },
  {
    date: "01/01/22",
    time: "14:22",
  },
];

export default function AlarmHistory() {
  return (
    <div className={styles.top}>
      <div className={styles.top__inner}>
        <h1 className={styles["alarm-history-header"]}>Alarm History:</h1>
        <div>
          {alarmData.map((data) => {
            return <AlarmHistoryItem data={data} />;
          })}
        </div>
      </div>
    </div>
  );
}
