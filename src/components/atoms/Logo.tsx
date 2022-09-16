import React from "react";
import styles from "@/styles/components/atoms/Logo.module.scss";

type Props = {
  width: number;
  height: number;
};

export default function Logo(props: Props) {
  return (
    <div className={styles.logo}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/logo.png" width={props.width} height={props.height} alt="Ondo" />
      <p className={styles.logo__text}>ONDO</p>
    </div>
  );
}
