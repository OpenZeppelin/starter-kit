import React, { Component } from "react";
import { Button } from "rimble-ui";
import styles from './Instructions.module.scss';

export default class Instructions extends Component {

  renderCounterSetup() {
    const addressDefault = this.props.ganacheAccounts.length > 2 ? this.props.ganacheAccounts[2] : '<ADDRESS>';
    return (
      <div className={styles.instructions}>
        <h2> Build your first app with ZepKit </h2>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. In another terminal, start your local blockchain with ganache in a new terminal.
          </div>
          <div className={styles.code}>
            <code>
              ganache-cli --secure -u 0 -u 1 -u 2 --deterministic
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. In a different terminal, init your project with ZeppelinOS (run inside your zepkit folder).
          </div>
          <div className={styles.code}>
            <code>
              zos init zepkit
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. Add the Counter contract to your project.
          </div>
          <div className={styles.code}>
            <code>
              zos add Counter
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            4. Connect with your local blockchain by opening a session (Note that we automatically prefilled your ganache account).
          </div>
          <div className={styles.code}>
            <code>
              zos session --network development --from {addressDefault} --expires 3600
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            5. Let's compile the Counter contract.
          </div>
          <div className={styles.code}>
            <code>
              zos push --deploy-dependencies
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            6. We create an instance of our contract and deploy it.
          </div>
          <div className={styles.code}>
            <code>
              zos create Counter --init initialize --args 2
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            7. Add a log to verify that the contract is available. Before line 77 in App.js, add:
          </div>
          <div className={styles.code}>
            <code>
              console.log(instance);
            </code>
          </div>
          <p> You should see a log that contains the Counter instance in your browser console </p>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            8. Done! Refresh the page to interact with your instance of the counter contract.
          </div>
          <Button onClick={() => window.location.reload()}>
            Reload
          </Button>
        </div>
      </div>
    );
  }

  renderSetup() {
    const isProd = process.env.NODE_ENV === 'production';
    if (!isProd) {
      return (
        <div className={styles.instructions}>
          <h1> ZepKit is running! </h1>
          <div className={styles.step}>
            <div className={styles.instruction}>
              Congratulations! Your application is correctly setup.
              Now, let's go through the tutorials to play with the basics.
              Visit the <a href='/counter'> Counter</a> page to deploy and interact with your first contract.
            </div>
          </div>
        </div>
      );
    }
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
            2. Install ZeppelinOS.
          </div>
          <div className={styles.code}>
            <code>
              npm install --g zos@2.1.2
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. Create a folder for your app and enter inside.
          </div>
          <div className={styles.code}>
            <code>
              mkdir my-app && cd my-app
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            4. Unbox the ZepKit.
          </div>
          <div className={styles.code}>
            <code>
              truffle unbox zeppelinos/zepkit
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            5. Run the web application to continue.
          </div>
          <div className={styles.code}>
            <code>
              cd client; npm run start
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            6. The ZepKit should be running locally! Continue the instructions on your localhost.
          </div>
        </div>
      </div>
    );
  }

  renderMetamask() {
    const addressDefault = this.props.ganacheAccounts.length > 2 ? this.props.ganacheAccounts[2] : '<ADDRESS>';
    const code =`
      web3.eth.sendTransaction({from: '${addressDefault}',to:'${this.props.accounts[0]}', value: web3.utils.toWei("0.5", "ether")})
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
        <div className={styles.question}>
          Q: How do I start from scratch and remove the tutorial?
        </div>
        <div className={styles.separator} />
        <div className={styles.step}>
          <div className={styles.instruction}>
            Run this command from the top level folder.
          </div>
          <div className={styles.code}>
            <code>
              npm run start-blank
            </code>
          </div>
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
    const addressDefault = this.props.ganacheAccounts.length > 2 ? this.props.ganacheAccounts[2] : '<ADDRESS>';
    return (
      <div className={styles.instructions}>
        <h2> Using EVM Packages </h2>
        <p> ZeppelinOS allows us to link packages that have been already deployed to the blockchain, instead of wasting resources deploying them again every time we need them in a project. </p>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Connect with your local blockchain by opening a session (Note that we automatically prefilled your ganache account).
          </div>
          <div className={styles.code}>
            <code>
              zos session --network development --from {addressDefault} --expires 3600
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
