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
              npm install -g truffle@5.0.2 && npm install -g ganache-cli@6.3.0
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Install ZeppelinOS
          </div>
          <div className={styles.code}>
            <code>
              npm install --g zos@2.1.2
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. Unbox the ZepKit. (Alternatively, clone the <a target="_blank" rel="noopener noreferrer" href="https://github.com/zeppelinos/zepkit">repo</a> and
            run <span className={styles.inline}>npm install</span> in the root and client folder.)
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
      web3.eth.sendTransaction({from: 'ADDR_GANACHE',to:'${this.props.accounts[0]}', value: web3.utils.toWei("0.5", "ether")})
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
        <div className={styles.separator} />
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Enter the mnemonic of the account you want to use to deploy in the <span className={styles.inline}> .env</span> file located in the top level folder.
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
          The Infura config for all main networks is already defined in <span className={styles.inline}>truffle-config.js</span>.
          You can see more information about this
          &nbsp;<a
            target="_blank"
            rel="noopener noreferrer"
            href="https://docs.zeppelinos.org/docs/mainnet">
          here
          </a>.
        </div>
        <div className={styles.question}>
          Q: How do I run tests?
        </div>
        <div className={styles.separator} />
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. To execute smart contract tests run:
          </div>
          <div className={styles.code}>
            <code>
              truffle test
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. To test your React components, (inside the client folder) run:
          </div>
          <div className={styles.code}>
            <code>
              npm run test
            </code>
          </div>
        </div>
        <div className={styles.question}>
          Q: How do I connect to other networks from my local website?
        </div>
        <div className={styles.separator} />
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Change the fallback provider by switching <span className={styles.inline}> REACT_APP_NETWORK </span> inside the .env file located in the client folder.
          </div>
          <div className={styles.code}>
            <code>
              REACT_APP_NETWORK = https://mainnet.infura.io/v3/d6760e62b67f4937ba1ea2691046f06d
            </code>
          </div>
        </div>
        <div className={styles.step}>
          Take into account that this only switches the default provider. If you are using Metamask, you only
          need to switch network from the extension.
        </div>
      </div>
    );
  }

  renderEVM() {
    return (
      <div className={styles.instructions}>
        <h2> Using EVM Packages </h2>
        <p> ZeppelinOS allows us to link packages that have been already deployed to the blockchain, instead of wasting resources deploying them again every time we need them in a project. </p>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Connect with your local blockchain by opening a session.
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
            2. We need the ERC20 standard. Let's grab it from open zeppelin.
          </div>
          <div className={styles.code}>
            <code>
              zos link openzeppelin-eth
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. Add the Wallet contract to your ZeppelinOS project.
          </div>
          <div className={styles.code}>
            <code>
              zos add Wallet
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            4. Push the Wallet and deploy the dependencies (OpenZeppelin EVM).
          </div>
          <div className={styles.code}>
            <code>
              zos push --deploy-dependencies
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            5. Create an instance of the wallet.
          </div>
          <div className={styles.code}>
            <code>
              {`zos create Wallet --init --args ${this.props.accounts[0]}`}
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            6. Congratulations! Your wallet contract should be good to go.
          </div>
          <Button onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            7. For extra fun, create an instance of the token to use within your wallet.
          </div>
          <div className={styles.code}>
            <code>
              {`zos create openzeppelin-eth/StandaloneERC20 --init --args 'MyToken,MYT,8,10000000000,${this.props.accounts[0]},[],[]'`}
            </code>
          </div>
          <p> Interact with it using the truffle console. More info <a
            href="https://docs.zeppelinos.org/docs/linking.html"
            target="_blank"
            rel="noopener noreferrer">
          here</a>. </p>
        </div>
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
      case 'evm':
        return this.renderEVM();
      default:
        return this.renderSetup();
    }
  }
}
