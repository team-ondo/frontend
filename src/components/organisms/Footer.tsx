import React from "react";
import styles from "@/styles/components/organisms/Footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footer__inner}>
        <div className={styles.footer__content}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" width={30} height={25} alt="Ondo" />
          <p className={styles.footer__contentText}>
            &#xA9; 2022 ONDO All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
