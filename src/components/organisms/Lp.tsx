import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Lp.module.scss";
import Form from "@/components/organisms/Form";
import Logo from "@/components/atoms/Logo";
import AnimationTrigger from "@/components/organisms/AnimationTrigger";
import FeatureList from "@/components/organisms/Lp_featurelist";
import { Link as Scroll } from "react-scroll";

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

  // FeatureList
  let featurelist = [];
  for (let i in FeatureList) {
    featurelist.push(
      <div className={styles.recommend__item} key={FeatureList[i].id}>
        <div className={styles.recommend__itemText}>
          <h3 className={styles.recommend__itemHeading}>
            {FeatureList[i].heading}
          </h3>
          <p
            className={styles.recommend__itemDescription1}
            dangerouslySetInnerHTML={{
              __html: FeatureList[i].description,
            }}
          ></p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className={styles.recommend__itemImage}
          src={FeatureList[i].image}
          width="400"
          height="193"
          alt=""
        />
      </div>
    );
  }

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
            {width < 900 ? "" : <div className={styles.mv__form}>
              <Form />
            </div>}
            <Scroll to="sp_form" smooth={true}>
              <div className={styles.mv__button}>Sign Up / Sign In</div>
            </Scroll>
          </div>
        </div>
      </section>
      <section className={styles.introduction}>
        <div className={styles.introduction__inner}>
          <div className={styles.introduction__detail}>
            <AnimationTrigger animation="fadeIn" rootMargin="100px" triggerOnce>
              <div className={styles.introduction__box}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon_graph.png" width={50} height={50} alt="graph" />
                <div className={styles.introduction__item}>
                  <p className={styles.introduction__title}>Check Data</p>
                  <p className={styles.introduction__text}>
                    You can see live and historical data.
                  </p>
                </div>
              </div>
            </AnimationTrigger>
            <AnimationTrigger animation="fadeIn" rootMargin="100px" triggerOnce>
              <div className={styles.introduction__box}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/icon_notifi.png"
                  width={50}
                  height={50}
                  alt="graph"
                />
                <div className={styles.introduction__item}>
                  <p className={styles.introduction__title}>
                    Send Notification
                  </p>
                  <p className={styles.introduction__text}>
                    If the home heater, you can get notification.
                  </p>
                </div>
              </div>
            </AnimationTrigger>
            <AnimationTrigger animation="fadeIn" rootMargin="100px" triggerOnce>
              <div className={styles.introduction__box}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/icon_alarm.png" width={50} height={50} alt="graph" />
                <div className={styles.introduction__item}>
                  <p className={styles.introduction__title}>Alarm</p>
                  <p className={styles.introduction__text}>
                    You can turn alarm off.
                  </p>
                </div>
              </div>
            </AnimationTrigger>
          </div>
        </div>
      </section>
      <section className={styles.recommend}>
        <div className={styles.recommend__inner}>
          <h2 className={styles.recommend__title}>ONDO has many features.</h2>
          {featurelist}
        </div>
      </section>
      {width < 900 ? <section className={styles.form} id="sp_form">
        <div className={styles.form__inner}>
          <Form />
        </div>
      </section> : ""}
    </>
  );
}
