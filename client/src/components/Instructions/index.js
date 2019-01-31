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
            4. Congratulations!! Visit the <a href='/counter'> Counter Example </a> to see it in action.
          </div>
        </div>
      </div>
    );
  }

  renderMetamask() {
    const code =`
      web3.eth.sendTransaction({from: ADDR_GANACHE,to:${this.props.accounts[0]}, value: web3.utils.toWei("0.5", "ether")})
    `;
    return (
      <div className={styles.instructions}>
        <h2> Fund your Metamask account </h2>
        <p> You need some ETH to be able to send transactions. </p>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Open a terminal and access the truffle console
          </div>
          <div className={styles.code}>
            <code>
              truffle console
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. Send 0.5 ETH from one of your ganache accounts to your Metamask account.
          </div>
          <div className={styles.code}>
            <code>
              {code}
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. Congratulations!! You can now interact with the contract and increase the counter.
          </div>
        </div>
      </div>
    );
  }

  renderUpgrade() {
    return (
      <div className={styles.instructions}>
        <h2> Upgrading your contract </h2>
        <p> Thanks to ZeppelinOS, you can upgrade the code of your contract to add more functionality. </p>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Open <span>contracts/Counter.sol</span> and uncomment the decreaseCounter method (lines 32-36).
          </div>
          <div className={styles.code}>
            <code>
              {`// function decreaseCounter(uint256 amount) public returns (bool) {`}
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. Save the changes and compile and push the new changes to the network.
          </div>
          <div className={styles.code}>
            <code>
              zos push
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. Update the already deployed contract with the new code
          </div>
          <div className={styles.code}>
            <code>
              zos update Counter
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            4. Congratulations! You have upgraded your contract and you can now decrease the counter.
          </div>
          <Button onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    );
  }

  renderFAQ() {
    return (
      <div className={styles.instructions}>
        <h2> FAQ </h2>
        <div className={styles.question}>
          Q: How do I deploy to other networks?
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Enter the mnemonic of the account you want to use to deploy in <span className={styles.inline}> .env</span>.
          </div>
          <div className={styles.code}>
            <code>
              mnemonic='fill'
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. Create a session with the desired network. Example: Mainnet
          </div>
          <div className={styles.code}>
            <code>
              {`zos session --network main --from <ADDR> --expires 3600`}
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. Deploy your code
          </div>
          <div className={styles.code}>
            <code>
              zos push --network main
            </code>
          </div>
        </div>
        <div className={styles.step}>
          You can see more information about this
          &nbsp;<a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.zeppelinos.org/docs/mainnet">
          here
          </a>.
        </div>
        <div className={styles.separator} />
      </div>
    );
  }

  render()  {
    const { name } = this.props;
    switch (name) {
      case 'setup':
        return this.renderSetup();
      case 'metamask':
        return this.renderMetamask();
      case 'upgrade':
        return this.renderUpgrade();
      case 'counter':
        return this.renderCounterSetup();
      case 'faq':
        return this.renderFAQ();
      default:
        return this.renderCounterSetup();
    }
  }
}
