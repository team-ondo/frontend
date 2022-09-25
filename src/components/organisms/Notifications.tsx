import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Notifications.module.scss";
import Modal from "react-modal";
import api from "@/lib/axios_settings";

export type NotificationsData = {
  id: number;
  date: string;
  content_type: string;
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

const modalStyles: any = {
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.3)",
  },

  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "80%",
    height: "300px",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("#__next");

export default function Notifications() {
  const [readState, setReadState] = useState<ReadState>(ReadState.All);
  const [notifiData, setNotifiData] = useState<NotificationsData[]>([]);
  const [allNotifiData, setAllNotifiData] = useState<NotificationsData[]>([]);
  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalData, setModalData] = useState<any>();

  useEffect(() => {
    api.get("/notifications").then((res) => {
      setAllNotifiData(res.data);
      setNotifiData(res.data);
    });
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

  const handleClickMessage = (data: NotificationsData) => {
    setIsOpen(true);
    setModalData(
      <>
        <div className={styles.modal__item}>
          <div className={styles.notifi__itemInfo}>
            <div
              className={`${styles.notifi__itemType} ${
                data.content_type === typeAlarm
                  ? styles["notifi__itemType--alarm"]
                  : data.content_type === typeSnooze
                  ? styles["notifi__itemType--snooze"]
                  : styles["notifi__itemType--out"]
              }`}
            >
              {data.content_type}
            </div>
            <p className={styles.notifi__itemDate}>{data.date}</p>
          </div>
          <p className={styles.modal__itemContent}>{data.content}</p>
        </div>
        <div className={styles.modal__btnArea}>
          <button className={styles.modal__closebtn} onClick={closeModal}>
            close
          </button>
        </div>
      </>
    );

    // update notifications table
    if (!data.is_read) {
      api.put(`/notifications/${data.id}`).then((res) => {
        data.is_read = true;
      });
    }
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
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
              notifiData.map((data: NotificationsData) => {
                return (
                  <div
                    className={styles.notifi__item}
                    key={data.id}
                    onClick={() => handleClickMessage(data)}
                  >
                    <div className={styles.notifi__itemInfo}>
                      <div
                        className={`${styles.notifi__itemType} ${
                          data.content_type === typeAlarm
                            ? styles["notifi__itemType--alarm"]
                            : data.content_type === typeSnooze
                            ? styles["notifi__itemType--snooze"]
                            : styles["notifi__itemType--out"]
                        }`}
                      >
                        {data.content_type}
                      </div>
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={modalStyles}
      >
        {modalData}
      </Modal>
    </>
  );
}
