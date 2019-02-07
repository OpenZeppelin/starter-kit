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
        <li><a href="/" className={styles.link}> Setup</a></li>
        {process.env.NODE_ENV !== 'production' && (
          <li><a href="/counter" className={styles.link}> Counter</a></li>
        )}
        {process.env.NODE_ENV !== 'production' && (
          <li><a href="/evm" className={styles.link}> EVM Packages</a></li>
        )}
        <li><a href="/faq" className={styles.link}> FAQ</a></li>
      </ul>
    </nav>
  </div>
)

export default Header;
