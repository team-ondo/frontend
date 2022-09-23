import React from "react";
import styles from "@/styles/components/molecules/AlarmHistoryItem.module.scss";

type Props = {
  data: {
    is_alarm: boolean;
    date: string;
  };
};

// TODO add hour
export default function AlarmHistoryItem({ data }: Props) {
  return (
    <div className={styles["item-container"]}>
      <p>The alarm was triggered on:</p>
      <p>
        <span className={styles.date}>{data.date}</span>
      </p>
    </div>
  );
}
