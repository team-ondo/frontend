import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Notifications.module.scss";

export type NotificationsData = {
  id: number;
  date: string;
  content: string;
  is_read: boolean;
};

const allNotifiData = [
  {
    id: 1,
    date: "01/01/22 14:30",
    content: "message",
    is_read: true,
  },
  {
    id: 2,
    date: "03/01/22 16:30",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 3,
    date: "05/01/22 08:01",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 4,
    date: "01/02/22 19:03",
    content: "messagemessagemessagemessagemessage",
    is_read: true,
  },
  {
    id: 5,
    date: "06/02/22 12:21",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 6,
    date: "10/03/22 14:22",
    content: "messagemessagemessagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 7,
    date: "12/04/22 09:10",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 8,
    date: "15/05/22 11:20",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 9,
    date: "01/07/22 15:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 10,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 11,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 12,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 13,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 14,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 15,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 16,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 17,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 18,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 19,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 20,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 21,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 22,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 23,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 24,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 25,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 26,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 27,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 28,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
];

// ToDo -> implement when message click
const handleClickMessage = (data: any) => {};

export default function Notifications() {
  const [readState, setReadState] = useState<string>("all");
  const [notifiData, setNotifiData] = useState<Array<NotificationsData> | undefined>([]);

  useEffect(() => {
    setNotifiData(allNotifiData);
  }, []);

  const handleClickState = (state: string) => {
    setReadState(state);
    switch (state) {
      case "all":
        setNotifiData(allNotifiData);
        break;

      case "unread":
        const unreadData = allNotifiData.filter((elm) => !elm.is_read);
        setNotifiData(unreadData);
        break;

      case "read":
        const readData = allNotifiData.filter((elm) => elm.is_read);
        setNotifiData(readData);
        break;
    }
  };

  return (
    <div className={styles.notifi}>
      <div className={styles.notifi__inner}>
        <nav className={styles.notifi__menu}>
          <button
            className={`${styles.notifi__menuButton} ${
              readState === "all" ? styles.notifi__read : ""
            }`}
            onClick={() => handleClickState("all")}
          >
            All
          </button>
          <button
            className={`${styles.notifi__menuButton} ${
              readState === "unread" ? styles.notifi__read : ""
            }`}
            onClick={() => handleClickState("unread")}
          >
            Unread
          </button>
          <button
            className={`${styles.notifi__menuButton} ${
              readState === "read" ? styles.notifi__read : ""
            }`}
            onClick={() => handleClickState("read")}
          >
            Read
          </button>
        </nav>
        <div className={styles.notifi__history}>
          {notifiData ? notifiData.map((data: any) => {
            return (
              <div
                className={styles.notifi__item}
                key={data.id}
                onClick={() => handleClickMessage(data)}
              >
                <p className={styles.notifi__itemDate}>{data.date}</p>
                <p
                  className={`${styles.notifi__itemContent} ${
                    !data.is_read ? styles.notifi__itemRead : ""
                  }`}
                >
                  {data.content}
                </p>
              </div>
            );
          }) : <></>}
        </div>
      </div>
    </div>
  );
}
