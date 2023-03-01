import React, { useState, useEffect } from "react";
import Link from "next/link";
import * as FaIcons from "react-icons/fa";
import styles from "./header.module.css";

const Header = () => {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <header className={styles.header}>
        <Link href="" className={styles.logo}>
          <img src="/img/PoutineLogo.png" alt="Logo" width={160} />
        </Link>
        <nav className={styles.nav}>
          <div className={styles.nav__icon} onClick={handleClick}>
            {click ? <FaIcons.FaTimes /> : <FaIcons.FaBars />}
          </div>
          <ul
            className={
              click ? [styles.navMenu, styles.active].join(" ") : styles.navMenu
            }
          >
            <li>
              <Link
                href="/"
                className={styles.navMenu__link}
                onClick={closeMobileMenu}
              >
                Accueil
              </Link>
            </li>
            <li>
              <Link
                href="/map"
                className={styles.navMenu__link}
                onClick={closeMobileMenu}
              >
                Carte interractive
              </Link>
            </li>
            <li>
              <Link
                href="/restaurants"
                className={styles.navMenu__link}
                onClick={closeMobileMenu}
              >
                Restaurants
              </Link>
            </li>
            <li>
              <Link
                href="/products"
                className={styles.navMenu__link}
                onClick={closeMobileMenu}
              >
                Products
              </Link>
            </li>
          </ul>
        </nav>
        <div className={styles.rightButtons}>
          <Link href="/signup" className={styles.signIn}>
            Inscription
          </Link>
          <Link href="/signin" className={styles.signUp}>
            Connexion
          </Link>
        </div>
      </header>
    </>
  );
};

export default Header;
