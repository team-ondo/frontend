import React, { useState, useEffect } from "react";
import styles from "@/styles/components/organisms/Header.module.scss";
import Logo from "@/components/atoms/Logo";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";
import Link from "next/link";
import Cookies from "js-cookie";
import { useSetRecoilState } from "recoil";
import { loginState } from "@/globalStates/atoms/Auth";

export default function Header() {
  const [width, setWidth] = useState<number>(0);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const setLoggedin = useSetRecoilState<boolean>(loginState);

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

  // click hamburger menu
  const hamburgerClick = () => {
    setOpenMenu(!openMenu);
  };

  // slide css
  const slideCss = `.react-slidedown.my-dropdown-slidedown {transition-duration: .2s;}`;

  // click logout button
  const handleClickLogout = () => {
    Cookies.remove("access_token");
    setLoggedin(false);
  };

  return (
    <>
      <header className={styles.header}>
        <div className={styles.header__inner}>
          <Link href="/">
            <a className={styles.header__logo}>
              <Logo width={100} height={84} />
            </a>
          </Link>
          {width < 900 ? (
            <>
              <div className={styles.hamburger} onClick={hamburgerClick}>
                <div
                  className={`${styles.hamburger__line} ${
                    openMenu ? styles["hamburger__line--active"] : ""
                  }`}
                ></div>
              </div>
            </>
          ) : (
            <nav className={styles.header__menu}>
              <div className={styles.header__menuInner}>
                <ul className={styles.header__menuList}>
                  <li className={styles.header__menuItem}>
                    <Link href="/">
                      <a className={styles.header__menuItemLink}>Top</a>
                    </Link>
                  </li>
                  <li className={styles.header__menuItem}>
                    <Link href="/history">
                      <a className={styles.header__menuItemLink}>
                        Historical data
                      </a>
                    </Link>
                  </li>
                  <li className={styles.header__menuItem}>
                    <Link href="/notifications">
                      <a className={styles.header__menuItemLink}>
                        Notifications
                      </a>
                    </Link>
                  </li>
                  <li className={styles.header__menuItem}>
                    <Link href="/settings">
                      <a className={styles.header__menuItemLink}>Settings</a>
                    </Link>
                  </li>
                  <li className={styles.header__menuItem}>
                    <div
                      className={styles.header__logout}
                      onClick={handleClickLogout}
                    >
                      Logout
                    </div>
                  </li>
                </ul>
              </div>
            </nav>
          )}
        </div>
      </header>
      <style>{slideCss}</style>
      <SlideDown className={"my-dropdown-slidedown"}>
        {openMenu ? (
          <nav className={styles.hamburger__content}>
            <Link href="/">
              <a className={styles.hamburger__contentItem}>Top</a>
            </Link>
            <Link href="/history">
              <a className={styles.hamburger__contentItem}>Historical data</a>
            </Link>
            <Link href="/notifications">
              <a className={styles.hamburger__contentItem}>Notifications</a>
            </Link>
            <Link href="/settings">
              <a className={styles.hamburger__contentItem}>Settings</a>
            </Link>
            <div
              className={styles.hamburger__contentItem}
              onClick={handleClickLogout}
            >
              Logout
            </div>
          </nav>
        ) : null}
      </SlideDown>
    </>
  );
}
