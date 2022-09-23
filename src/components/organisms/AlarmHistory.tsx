import React, { useState, useEffect } from "react";
import AlarmHistoryItem from "../molecules/AlarmHistoryItem";
import api from "../../lib/axios_settings";

import styles from "@/styles/components/organisms/AlarmHistory.module.scss";

// const alarmData = [
//   {
//     date: "01/01/22",
//     time: "14:30",
//   },
//   {
//     date: "03/01/22",
//     time: "16:30",
//   },
//   {
//     date: "05/01/22",
//     time: "08:01",
//   },
//   {
//     date: "01/02/22",
//     time: "19:03",
//   },
//   {
//     date: "06/02/22",
//     time: "12:21",
//   },
//   {
//     date: "10/03/22",
//     time: "14:22",
//   },
//   {
//     date: "12/04/22",
//     time: "09:10",
//   },
//   {
//     date: "15/05/22",
//     time: "11:20",
//   },
//   {
//     date: "01/07/22",
//     time: "15:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
//   {
//     date: "01/01/22",
//     time: "14:22",
//   },
// ];

type AlarmData = {
  is_alarm: boolean;
  date: string;
  hour: string;
};

export default function AlarmHistory() {
  // STATE
  const [dataAlarm, setDataAlarm] = useState<AlarmData[]>([]);

  // TEST VARIABLES
  const device_id = "a7382f5c-3326-4cf8-b717-549affe1c2eb";

  // EXECUTE ONCE ON LOAD
  useEffect(() => {
    api.get(`/device-data/${device_id}/historical/alarm`).then((res) => {
      let historicalAlarmData = res.data;
      setDataAlarm(historicalAlarmData);
    });
  }, []);

  return (
    <div className={styles.top}>
      <div className={styles.top__inner}>
        <h1 className={styles["alarm-history-header"]}>Alarm History:</h1>
        <div className={styles["alarm-history-container"]}>
          {dataAlarm.map((data, i) => {
            return <AlarmHistoryItem data={data} key={i} />;
          })}
        </div>
      </div>
    </div>
  );
}
