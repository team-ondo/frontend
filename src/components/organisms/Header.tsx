import React from "react";
import styles from "@/styles/components/organisms/Header.module.scss";
import Logo from "@/components/atoms/Logo";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Logo />
      </div>
    </header>
  );
}