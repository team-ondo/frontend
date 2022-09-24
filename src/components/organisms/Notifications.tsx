import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Notifications.module.scss";

export type NotificationsData = {
  id: number;
  date: string;
  content: string;
  is_read: boolean;
};

const ReadState = {
  All: 0,
  Unread: 1,
  Read: 2,
} as const;

type ReadState = typeof ReadState[keyof typeof ReadState];

const typeAlarm = "Alarm";
const typeSnooze = "Snooze";

const allNotifiData = [
  {
    id: 1,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "message",
    is_read: true,
  },
  {
    id: 2,
    date: "2022-07-01 12:23:45",
    content_type: "Snooze",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 3,
    date: "2022-07-01 12:23:45",
    content_type: "Out",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 4,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: true,
  },
  {
    id: 5,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 6,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 7,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 8,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 9,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 10,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 11,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 12,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 13,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 14,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 15,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 16,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 17,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 18,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 19,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 20,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 21,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 22,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 23,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 24,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 25,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 26,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 27,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
  {
    id: 28,
    date: "2022-07-01 12:23:45",
    content_type: "Alarm",
    content: "messagemessagemessagemessagemessage",
    is_read: false,
  },
];

// ToDo -> implement when message click
const handleClickMessage = (data: any) => {};

export default function Notifications() {
  const [readState, setReadState] = useState<ReadState>(ReadState.All);
  const [notifiData, setNotifiData] = useState<NotificationsData[]>([]);

  useEffect(() => {
    setNotifiData(allNotifiData);
  }, []);

  const handleClickState = (state: ReadState) => {
    setReadState(state);
    switch (state) {
      case ReadState.All:
        setNotifiData(allNotifiData);
        break;

      case ReadState.Unread:
        const unreadData = allNotifiData.filter((elm) => !elm.is_read);
        setNotifiData(unreadData);
        break;

      case ReadState.Read:
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
              readState === ReadState.All ? styles.notifi__read : ""
            }`}
            onClick={() => handleClickState(ReadState.All)}
          >
            All
          </button>
          <button
            className={`${styles.notifi__menuButton} ${
              readState === ReadState.Unread ? styles.notifi__read : ""
            }`}
            onClick={() => handleClickState(ReadState.Unread)}
          >
            Unread
          </button>
          <button
            className={`${styles.notifi__menuButton} ${
              readState === ReadState.Read ? styles.notifi__read : ""
            }`}
            onClick={() => handleClickState(ReadState.Read)}
          >
            Read
          </button>
        </nav>
        <div className={styles.notifi__history}>
          {notifiData ? (
            notifiData.map((data: any) => {
              return (
                <div
                  className={styles.notifi__item}
                  key={data.id}
                  onClick={() => handleClickMessage(data)}
                >
                  <div className={styles.notifi__itemInfo}>
                    <div className={`${styles.notifi__itemType} ${ data.content_type === typeAlarm ? styles["notifi__itemType--alarm"] : data.content_type === typeSnooze ? styles["notifi__itemType--snooze"] : styles["notifi__itemType--out"]}`}>{data.content_type}</div>
                    <p className={styles.notifi__itemDate}>{data.date}</p>
                  </div>
                  <p
                    className={`${styles.notifi__itemContent} ${
                      !data.is_read ? styles.notifi__itemRead : ""
                    }`}
                  >
                    {data.content}
                  </p>
                </div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
}
