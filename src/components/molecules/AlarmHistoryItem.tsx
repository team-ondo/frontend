import React from "react";
import styles from "@/styles/components/molecules/AlarmHistoryItem.module.scss";

type Props = {
  data: {
    date: string;
    hour: string;
  };
};

export default function AlarmHistoryItem({ data }: Props) {
  return (
    <div className={styles["item-container"]}>
      <p>The alarm was triggered on:</p>
      <p>
        <span className={styles["date-time"]}>{data.date}</span> at{" "}
        <span className={styles["date-time"]}>{data.hour}</span>
      </p>
    </div>
  );
}
