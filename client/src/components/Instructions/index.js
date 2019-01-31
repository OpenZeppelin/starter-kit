import React, { Component } from "react";
import styles from './Instructions.module.scss';

export default class Instructions extends Component {

  render()  {
    return (
      <div className={styles.instructions}>
        <h1> Installation </h1>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Install truffle and ganache-cli for local development.
          </div>
          <div className={styles.code}>
            <code>
              npm install -g truffle && npm install -g ganache-cli
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. Unbox the ZepKit.
          </div>
          <div className={styles.code}>
            <code>
              truffle unbox zepkit
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. Run the web application to continue.
          </div>
          <div className={styles.code}>
            <code>
              cd client; npm run start
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            4. Congratulations!! Visit the <a href='/'> Counter Example </a> to see it in action.
          </div>
        </div>
      </div>
    );
  }
}
