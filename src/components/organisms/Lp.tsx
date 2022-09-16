import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Lp.module.scss";
import Form from "@/components/organisms/Form";

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
            Welcome!
            <Form />
          </div>
        </div>
      </section>
    </>
  );
}
