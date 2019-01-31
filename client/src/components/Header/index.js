import React from 'react';
import styles from './header.module.scss';
import logo from './logo-red.png';

const Header = () => (
  <div className={styles.header}>
    <nav id="menu" className="menu">
      <ul>
        <li className={styles.brand}>
          <img src={logo} alt="logo" />
          <a href="/" className={styles.link}> Zepkit</a>
        </li>
        <li><a href="/setup" className={styles.link}> Setup</a></li>
        <li><a href="/" className={styles.link}> Counter Example</a></li>
      </ul>
    </nav>
  </div>
)

export default Header;
