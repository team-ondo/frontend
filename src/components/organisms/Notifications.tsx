import React from "react";
import styles from "@/styles/components/organisms/Notifications.module.scss";

const notifiData = [
  {
    id: 1,
    date: "01/01/22 14:30",
    content: "message",
    is_read: 1,
  },
  {
    id: 2,
    date: "03/01/22 16:30",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 3,
    date: "05/01/22 08:01",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 4,
    date: "01/02/22 19:03",
    content: "messagemessagemessagemessagemessage",
    is_read: 1,
  },
  {
    id: 5,
    date: "06/02/22 12:21",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 6,
    date: "10/03/22 14:22",
    content: "messagemessagemessagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 7,
    date: "12/04/22 09:10",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 8,
    date: "15/05/22 11:20",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 9,
    date: "01/07/22 15:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 10,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 11,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 12,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 13,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 14,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 15,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 16,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 17,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 18,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 19,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 20,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 21,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 22,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 23,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 24,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 25,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 26,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 27,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
  {
    id: 28,
    date: "01/01/22 14:22",
    content: "messagemessagemessagemessagemessage",
    is_read: 0,
  },
];

export default function Notifications() {
  return (
    <div className={styles.notifi}>
      <div className={styles.notifi__inner}>
        <nav className={styles.notifi__menu}>
          <button className={styles.notifi__menuButton}>All</button>
          <button className={styles.notifi__menuButton}>Unread</button>
          <button className={styles.notifi__menuButton}>Read</button>
        </nav>
        <div className={styles.notifi__history}>
          {notifiData.map((data) => {
            return (
              <div className={styles.notifi__item} key={data.id}>
                <p className={styles.notifi__itemDate}>{data.date}</p>
                <p
                  className={`${styles.notifi__itemContent} data.is_read ? ${styles.notifi__itemRead} : ""`}
                >
                  {data.content}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
