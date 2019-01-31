import React, { Component } from "react";
import { Button } from "rimble-ui";
import styles from './Instructions.module.scss';

export default class Instructions extends Component {

  renderCounterSetup() {
    return (
      <div className={styles.instructions}>
        <h2> Compile and Deploy Locally </h2>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Start your local blockchain with ganache in a new terminal.
          </div>
          <div className={styles.code}>
            <code>
              ganache-cli --secure -u 0 -u 1 -u 2 --deterministic
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. Init your project with ZeppelinOS.
          </div>
          <div className={styles.code}>
            <code>
              zos init zepkit
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. Add the Counter contract to your ZeppelinOS project.
          </div>
          <div className={styles.code}>
            <code>
              zos add Counter
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            4. Connect with your local blockchain by opening a session.
            <br /> Note: Grab the second or third address that ganache returned and pass it.
          </div>
          <div className={styles.code}>
            <code>
              zos session --network development --from {"<ADDR_2>"} --expires 3600
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            4. Let's compile the Counter contract and deploy it to the local blockchain.
          </div>
          <div className={styles.code}>
            <code>
              zos push
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            5. We create an instance of our upgradeable contract.
          </div>
          <div className={styles.code}>
            <code>
              zos create Counter --init initialize --args 2
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            6. Done! Refresh the page to interact with the contract.
          </div>
          <Button onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    );
  }

  renderSetup() {
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
            1. Install ZeppelinOS
          </div>
          <div className={styles.code}>
            <code>
              npm install --global zos
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

  render()  {
    const { name } = this.props;
    if (name === 'setup') {
      return this.renderSetup();
    }
    return this.renderCounterSetup();
  }
}
