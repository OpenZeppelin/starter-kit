import React, { Component } from 'react';
import { Button } from 'rimble-ui';
import styles from './Instructions.module.scss';

export default class Instructions extends Component {
  renderCounterSetup() {
    return (
      <div className={styles.instructions}>
        <h2> Build your first app with ZepKit </h2>
        <div className={styles.step}>
          <div className={styles.instruction}>Initialize your ZeppelinOS project</div>
          <div className={styles.code}>
            <code>zos init {'<<your project name>>'}</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            We create an instance of our contract and deploy it, follow the <span className={styles.inline}>cli</span>
            prompts.
          </div>
          <div className={styles.code}>
            <code>zos create Counter</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            Done! Refresh the page to interact with your instance of the counter contract.
          </div>
          <div className={styles.instruction}>
            Learn more about <a href="https://zeppelinos.org/">ZeppelinOS</a> or ask a question in the{' '}
            <a href="https://forum.zeppelin.solutions">Forum</a>.
          </div>
          <Button onClick={() => window.location.reload()}>Reload</Button>
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
            <div className={styles.instruction}>Congratulations! Your application is correctly setup.</div>
          </div>

          <div className={styles.step}>
            <div className={styles.instruction}>
              Visit the tutorials. Start with the <a href="/counter"> Counter</a> page to deploy and interact with your
              first contract.
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className={styles.instructions}>
        <h1> Installation </h1>
        <div className={styles.step}>
          <div className={styles.instruction}>Install ZeppelinOS, Ganache, and Truffle.</div>
          <div className={styles.code}>
            <code>npm install -g truffle@5.0.2 ganache-cli@6.3.0 zos@2.4.0</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>Create a folder for your app and enter inside.</div>
          <div className={styles.code}>
            <code>mkdir my-app && cd my-app</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>Unbox the ZepKit.</div>
          <div className={styles.code}>
            <code>zos unpack tutorial</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>Run your local blockchain.</div>
          <div className={styles.code}>
            <code>ganache-cli --deterministic</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>Initialize the ZeppelinOS project.</div>
          <div className={styles.code}>
            <code>zos init zepkit</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>Switch to the client folder and run the web application to continue.</div>
          <div className={styles.code}>
            <code>cd client; npm run start</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            The ZepKit should be running locally! Continue the instructions on your localhost.
          </div>
        </div>
      </div>
    );
  }

  renderMetamask() {
    const code = this.props.accounts[0];
    return (
      <div className={styles.instructions}>
        <h2> Fund your Metamask account </h2>
        <p> You need some ETH to be able to send transactions. </p>
        <div className={styles.step}>
          <div className={styles.instruction}>1. Open a terminal and type</div>
          <div className={styles.code}>
            <code>zos transfer</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. Send 0.5 ETH from one of your ganache accounts to your Metamask account.
          </div>
          <div className={styles.code}>
            <code>{code}</code>
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
            <code>{`// function decreaseCounter(uint256 amount) public returns (bool) {`}</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. Save the changes and compile, push, and update the new changes to the network.
          </div>
          <div className={styles.code}>
            <code>zos update Counter</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. Congratulations! You have upgraded your contract and you can now decrease the counter.
          </div>
          <br />
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </div>
      </div>
    );
  }

  renderAutoUpgrade() {
    return (
      <div className={styles.instructions}>
        <h2> Upgrading on Development Network </h2>
        <p>
          {' '}
          Thanks to ZeppelinOS and Solidity Hot Loader your smart contracts would reload automatically after you save a
          .sol file while preserving a state.{' '}
        </p>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Open <span>contracts/Counter.sol</span> and uncomment the decreaseCounter method (lines 32-36).
          </div>
          <div className={styles.code}>
            <code>{`// function decreaseCounter(uint256 amount) public returns (bool) {`}</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. Save the changes and wait for the .sol files to compile. Upon completion, ZOS will push and update your
            smart contracts
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. Congratulations! You have upgraded your contract and you can now decrease the counter.
          </div>
        </div>
        <div className={styles.separator} />
        <p>
          {' '}
          * On a non development network you would have to run <strong>zos update</strong> command manually.{' '}
        </p>
      </div>
    );
  }

  renderFAQ() {
    return (
      <div className={styles.instructions}>
        <h2> FAQ </h2>
        <div className={styles.question}>Q: How do I deploy to other networks?</div>
        <div className={styles.separator} />
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Enter the mnemonic of the account you want to use to deploy in the{' '}
            <span className={styles.inline}> .env</span> file located in the top level folder. Add your network to the{' '}
            <span className={styles.inline}>networks.js</span> file.
          </div>
          <div className={styles.code}>
            <code>mnemonic='fill'</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>3. Push the project contracts and deploy the dependencies (if any).</div>
          <div className={styles.code}>
            <code>zos push </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            4. Create the instances and follow the <span className={styles.inline}>cli</span> prompts
          </div>
          <div className={styles.code}>
            <code>zos create CONTRACT_NAME </code>
          </div>
        </div>
        <div className={styles.question}>Q: How do I run tests?</div>
        <div className={styles.separator} />
        <div className={styles.step}>
          <div className={styles.instruction}>1. To execute smart contract tests run:</div>
          <div className={styles.code}>
            <code>truffle test</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>2. To test your React components, (inside the client folder) run:</div>
          <div className={styles.code}>
            <code>npm run test</code>
          </div>
        </div>
        <div className={styles.question}>Q: How do I connect to other networks from my local website?</div>
        <div className={styles.separator} />
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Change the fallback provider by switching <span className={styles.inline}> REACT_APP_NETWORK </span>{' '}
            inside the .env file located in the client folder.
          </div>
          <div className={styles.code}>
            <code>REACT_APP_NETWORK = https://mainnet.infura.io/v3/d6760e62b67f4937ba1ea2691046f06d</code>
          </div>
        </div>
        <div className={styles.step}>
          Take into account that this only switches the default provider. If you are using Metamask, you only need to
          switch network from the extension.
        </div>
      </div>
    );
  }

  renderEVM() {
    return (
      <div className={styles.instructions}>
        <h2> Using EVM Packages </h2>
        <p>
          {' '}
          ZeppelinOS allows us to link packages that have been already deployed to the blockchain, instead of wasting
          resources deploying them again every time we need them in a project.{' '}
        </p>
        <div className={styles.step}>
          <div className={styles.instruction}>1. We need the ERC20 standard. Let's grab it from open zeppelin.</div>
          <div className={styles.code}>
            <code>zos link openzeppelin-eth</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>2. Add the Wallet contract to your ZeppelinOS project.</div>
          <div className={styles.code}>
            <code>zos add Wallet</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>4. Push the Wallet and deploy the dependencies (OpenZeppelin EVM).</div>
          <div className={styles.code}>
            <code>zos push</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            5. Create an instance of the wallet, and follow the <span className={styles.inline}>cli</span> prompts. You
            will want to run the function <code>initialize</code> with your account address {this.props.accounts[0]} as
            the arguement.
          </div>
          <div className={styles.code}>
            <code>zos create Wallet</code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>6. Congratulations! Your wallet contract should be good to go.</div>
          <Button onClick={() => window.location.reload()}>Reload</Button>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            7. For extra fun, create an instance of the token to use within your wallet. Call the{' '}
            <code>initialize</code> function again and follow the <span className={styles.inline}>cli</span> prompts to
            customize your token.
          </div>
          <div className={styles.code}>
            <code>{`zos create openzeppelin-eth/StandaloneERC20`}</code>
          </div>
          <p>
            {' '}
            Interact with your token directly from the cli.{' '}
            <a href="https://docs.zeppelinos.org/" target="_blank" rel="noopener noreferrer">
              Learn more
            </a>
            .{' '}
          </p>
        </div>
      </div>
    );
  }

  getDefaultAddress() {
    const { ganacheAccounts } = this.props;
    return (ganacheAccounts && ganacheAccounts.length) > 2 ? ganacheAccounts[2] : '<ADDRESS>';
  }

  render() {
    const { name } = this.props;
    switch (name) {
      case 'setup':
        return this.renderSetup();
      case 'metamask':
        return this.renderMetamask();
      case 'upgrade':
        return this.renderUpgrade();
      case 'upgrade-auto':
        return this.renderAutoUpgrade();
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
