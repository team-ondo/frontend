import React, { useState, useEffect } from "react";
import styles from "@/styles/components/molecules/Menu.module.scss";
import { SlideDown } from "react-slidedown";
import "react-slidedown/lib/slidedown.css";

export default function Menu() {
  const [width, setWidth] = useState<number>(0);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

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

  return (
    <>
      {width < 900 ? (
        <>
          <div className={styles.hamburger} onClick={hamburgerClick}>
            <div
              className={`${styles.hamburger__line} ${
                openMenu ? styles["hamburger__line--active"] : ""
              }`}
            ></div>
          </div>
          <style>{slideCss}</style>
          <SlideDown className={"my-dropdown-slidedown"}>
            {openMenu ? (
              <nav className={styles.hamburger__content}>
                <a></a>
              </nav>
            ) : null}
          </SlideDown>
        </>
      ) : (
        <></>
      )}
    </>
  );
}
