import React from "react";
import styles from "@/styles/components/organisms/Header.module.scss";
import Logo from "@/components/atoms/Logo";
import Menu from "@/components/molecules/Menu";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.header__inner}>
        <Logo width={100} height={84} />
        <Menu />
      </div>
    </header>
  );
}
