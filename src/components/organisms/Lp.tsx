import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Lp.module.scss";
import Form from "@/components/organisms/Form";
import Logo from "@/components/atoms/Logo";

export default function Lp() {
  const [width, setWidth] = useState(0);
  useEffect(() => {
    // get the wiindow width
    function handleResize() {
      setWidth(window.innerWidth);
    }

    // resize
    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  });

  return (
    <>
      <section className={styles.mv}>
        <div className={styles.mv__bgArea}>
          <div className={styles.mv__inner}>
            <div className={styles.mv__text}>
              <Logo width={100} height={84} />
              <p className={styles.mv__textDetail}>Ondo helps people!</p>
              <p className={styles.mv__textDetailS}>
                Ondo monitors the temperature and humidity of home in order to
                ensure safety during hotter month.
              </p>
            </div>
            <div className={styles.mv__form}><Form /></div>
          </div>
        </div>
      </section>
      <section className={styles.introduction}>
        <div className={styles.introduction__inner}>
          <div className={styles.introduction__detail}>
            <div className={styles.introduction__box}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon_graph.png" width={50} height={50} alt="graph" />
              <div className={styles.introduction__item}>
                <p className={styles.introduction__title}>
                  Check Data
                </p>
                <p className={styles.introduction__text}>You can see live and historical data.</p>
              </div>
            </div>
            <div className={styles.introduction__box}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon_notifi.png" width={50} height={50} alt="graph" />
              <div className={styles.introduction__item}>
                <p className={styles.introduction__title}>
                  Send Notification
                </p>
                <p className={styles.introduction__text}>If the home heater, you can get notification.</p>
              </div>
            </div>
            <div className={styles.introduction__box}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/icon_alarm.png" width={50} height={50} alt="graph" />
              <div className={styles.introduction__item}>
                <p className={styles.introduction__title}>
                  Alarm
                </p>
                <p className={styles.introduction__text}>You can turn alarm off.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
