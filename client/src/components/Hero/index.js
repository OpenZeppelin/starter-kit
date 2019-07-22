import React, { Component } from 'react';
import styles from './Hero.module.scss';
import cx from 'classnames';
import logos from './pic_bg.png';

export default class Hero extends Component {
  renderLogo(name, imgUrl) {
    return (
      <div className={cx(styles.logo, styles[name])}>
        <img alt="zeppelin" className="logo-img" src={imgUrl} />
      </div>
    );
  }
  render() {
    return (
      <div className={styles.Hero}>
        <div className={styles.hwrapper}>
          <div className={styles.left}>
            <h1> Welcome to Starter Kits! </h1>
            <h2>The easiest way to build a Web3 application with the most trusted tools in Ethereum.</h2>
            <div className={styles.sellingpoints}>
              <div className={styles.feature}>
                - Includes{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://openzeppelin.org/">
                  OpenZeppelin
                </a>{' '}
                as an EVM package.
              </div>
              <div className={styles.feature}>
                - Upgradeable smart contracts with{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://openzeppelin.com/start/">
                  OpenZeppelin SDK
                </a>
                .
              </div>
              <div className={styles.feature}>
                - Includes{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://infura.io">
                  Infura
                </a>{' '}
                setup for easy deployments & connection.
              </div>
              <div className={styles.feature}>
                -{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://truffleframework.com/">
                  Truffle
                </a>{' '}
                to compile & test smart contracts.
              </div>
              <div className={styles.feature}>
                -{' '}
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/facebook/create-react-app">
                  React{' '}
                </a>{' '}
                & &nbsp;
                <a target="_blank" rel="noopener noreferrer" href="https://rimble.consensys.design">
                  Rimble
                </a>{' '}
                to build usable and friendly interfaces.
              </div>
            </div>
            <div className={styles.ctas}>
              <a
                className={styles.mainLink}
                target="_blank"
                rel="noopener noreferrer"
                href="https://github.com/OpenZeppelin/starter-kit"
              >
                > View code on github
              </a>
            </div>
          </div>
          <div className={styles.right}>
            <img alt="Starter Kits" src={logos} />
          </div>
        </div>
      </div>
    );
  }
}
