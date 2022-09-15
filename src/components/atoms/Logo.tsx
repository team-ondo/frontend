import React from "react";
import styles from "@/styles/components/atoms/Logo.module.scss";

export default function Logo() {
  return (
    <div className={styles.logo}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" width={100} height={84} alt="Ondo" />
      <p className={styles.logo__text}>ONDO</p>
    </div>
  );
}
