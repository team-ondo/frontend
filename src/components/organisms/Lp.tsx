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
            {width > 750 && <Form />}
          </div>
        </div>
      </section>
    </>
  );
}
