import React from 'react'
import styles from './Header.module.scss';
import weatherIcon from '../assets/weather-icon.png'


const Header = () => {
  return (
    <header className={styles['headers']}>
      <div className={styles["logo-wrapper"]}>
        <a className={styles["logo-course"]} href="#"><img src={weatherIcon} alt="logo img" height="100%" /></a>
      </div>
      <nav className={styles["nav__comp"]}>
        <ul className={styles["nav__list"]}>
          <li className={styles["nav__item"]}>
            <a className={styles["course-home"]} href="#">today</a>
          </li>
          <li className={styles["nav__item"]}>
            <a className={styles["contacts-course"]} href="#">1 hour</a>
          </li>
          <li className={styles["nav__item"]}>
            <a className={styles["content-course"]} href="#">48 hours</a>
          </li>
          <li className={styles["nav__item"]}>
            <a id={styles["about-course"]} href="#">7 days</a>
          </li>
          <li className={styles["nav__item"]}>
            <a className={styles["login-course"]} href="#">sign in</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header