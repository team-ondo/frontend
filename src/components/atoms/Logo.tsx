import React from "react";
import styles from "@/styles/components/atoms/Logo.module.scss";
import Image from "next/image";

export default function Logo() {
  return (
    <div className={styles.logo}>
      <Image src="/logo.png" width={450} height={150} alt="Ondo" />
    </div>
  );
}
