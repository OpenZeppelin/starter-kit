import React, { Component } from "react";
import styles from './Hero.module.scss';

export default class Hero extends Component {

  renderLogo(imgUrl) {
    return (
      <div className={styles.logo}>
        <img alt="zeppelin" className="logo-img"
          src={imgUrl} />
      </div>
    );
  }
  render()  {
    return (
      <div className={styles.Hero}>
        <div className={styles.left}>
          <h1> Welcome to ZepKit! </h1>
          <h2>
            The starter kit that builds on the shoulders <br />
            of the most trusted tools in Ethereum.
          </h2>
          <div className={styles.logos}>
            {this.renderLogo("https://pbs.twimg.com/profile_images/1011632102595612672/dtbSw8w1_400x400.jpg")}
            {this.renderLogo("https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png")}
            {this.renderLogo("https://res-5.cloudinary.com/crunchbase-production/image/upload/c_lpad,h_256,w_256,f_auto,q_auto:eco/blkhxycyoyj4zk4trcjo")}
            {this.renderLogo("https://davidburela.files.wordpress.com/2017/07/truffle-logo.png?w=700")}
          </div>
        </div>
        <div className={styles.right}>
          <h2> Features & Technologies</h2>
          <div className={styles.sellingpoints}>
            <div className={styles.feature}>
              - Include OpenZeppelin as an EVM package.
            </div>
            <div className={styles.feature}>
              - Upgradeable smart contracts from the get-go.
            </div>
            <div className={styles.feature}>
              - Includes Infura setup for easy deployments & network connection.
            </div>
            <div className={styles.feature}>
              - Truffle to compile & test smart contracts.
            </div>
            <div className={styles.feature}>
              - React & Rimble to build usable and friendly interfaces.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
