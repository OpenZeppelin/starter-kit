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
            5. Let's deploy the Counter contract.
          </div>
          <div className={styles.code}>
            <code>
              zos push --deploy-dependencies
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            6. We create an instance of our contract.
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

  renderGaslessCounterSetup() {
    const addressDefault = this.props.ganacheAccounts.length > 2 ? this.props.ganacheAccounts[2] : '<ADDRESS>';
    return (
      <div className={styles.instructions}>
        <h2> Build your first app with ZepKit </h2>
        <div className={styles.step}>
          <div className={styles.instruction}>
            1. Ensure Docker is installed on your computer.
          </div>
          <div className={styles.code}>
            <code>
              <a href="https://docs.docker.com/install/">https://docs.docker.com/install/</a>
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            2. Kill any currently running ganache sessions on port 8545
          </div>
          <div className={styles.code}>
            <code>
              npx kill-port 8545
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            3. In another terminal, run the gas relay docker container with ganache, wait a few seconds for it to spin up (run inside your zepkit folder).
          </div>
          <div className={styles.code}>
            <code>
              npm explore tabookey-gasless npm run gsn-dock-relay-ganache
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            4. In a different terminal, init your project with ZeppelinOS (run inside your zepkit folder).
          </div>
          <div className={styles.code}>
            <code>
              zos init zepkit
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            5. Add the GaslessCounter contract to your project.
          </div>
          <div className={styles.code}>
            <code>
              zos add GaslessCounter
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            6. Connect with your local blockchain by opening a session (Note that we automatically prefilled your ganache account).
          </div>
          <div className={styles.code}>
            <code>
              zos session --network development --from {addressDefault} --expires 3600
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            7. Let's deploy the Gasless Counter contract.
          </div>
          <div className={styles.code}>
            <code>
              zos push --deploy-dependencies
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            8. We create an instance of our contract.
          </div>
          <div className={styles.code}>
            <code>
              zos create GaslessCounter --init initialize
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            9. Open up truffle console.
          </div>
          <div className={styles.code}>
            <code>
              truffle console
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            10. Deposit Ether into the Relay Hub for your GaslessCounter contract. This is the pool of Ether that will pay for user's transactions.
          </div>
          <div className={styles.code}>
            <code>
              {`RelayHub.at('0x9C57C0F1965D225951FE1B2618C92Eefd687654F').then(hub => hub.depositFor(GaslessCounter.address, { value:1e18 }));`}
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            11. Make your Gasless Counter contract aware of the Relay Hub.
          </div>
          <div className={styles.code}>
            <code>
              {`GaslessCounter.at(GaslessCounter.address).then(counter => counter.init_hub('0x9C57C0F1965D225951FE1B2618C92Eefd687654F'))`}
            </code>
          </div>
        </div>
        <div className={styles.step}>
          <div className={styles.instruction}>
            12. Done! Simply switch Metamask to localhost and restart the client to continue.
          </div>
          <div className={styles.code}>
            <code>
              npm run start
            </code>
          </div>
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
              Now, you have two options:
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.instruction}>
              a. Start your project from scratch.
            </div>
            <div className={styles.code}>
              <code>
                npm run start-blank
              </code>
            </div>
          </div>

          <div className={styles.step}>
            <div className={styles.instruction}>
              b. Visit the tutorials. Start with the <a href='/counter'> Counter</a> page to deploy and interact with your first contract, or deploy a <a href='/gasless-counter'>Gasless Counter</a> which utilizes metatransactions.
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
              npm install --g zos@2.2.0
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
            5. Switch to the client folder and run the web application to continue.
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

    renderGaslessUpgrade() {
      return (
        <div className={styles.instructions}>
          <h2> Upgrading your contract with access control </h2>
          <p> Thanks to ZeppelinOS, you can upgrade the code of your contract to add more functionality. With this functionality we can restrict access to relayed transactions. </p>
          <h3> What is a relayed transaction? </h3>
          <p> Tabookey's Relay Hub provides set of relay nodes which can make transactions on your behalf. Rather than transacting directly with your contract, you will be sending a signed message to one of these relay nodes (in our case, a relayer set up by the docker container). The relay node will then make the transaction on your behalf, and will be refunded by the deposit of the contract itself on the Relay Hub.</p>
          <div className={styles.step}>
            <div className={styles.instruction}>
              1. Currently we have a whitelist to restrict access to relayed transactions, but it is not in use. Let's activate the whitelist. Open <span>contracts/GaslessCounter.sol</span> and change line 45
            </div>
            from:
            <div className={styles.code}>
              <code>
                {`require(!whiteList[from]);`}
              </code>
            </div>
             to:
           <div className={styles.code}>
              <code>
                {`require(whiteList[from]);`}
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
                zos update GaslessCounter
              </code>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.instruction}>
              4. Attempt to increse the counter, you will notice the transactions fails as your address is not on the whitelist. Let's add your address to the whitelist.
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.instruction}>
              5. Open up the truffle console
            </div>
            <div className={styles.code}>
              <code>
                truffle console
              </code>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.instruction}>
              6. In truffle console, add your metamask address to the whitelist.
            </div>
            <div className={styles.code}>
              <code>
                {`GaslessCounter.deployed().then(function(instance) { return instance.addToWhiteList('${this.props.accounts[0]}')})`}
              </code>
            </div>
          </div>
          <div className={styles.step}>
            <div className={styles.instruction}>
              7. Congratulations! You have upgraded your contract with a whitelist and now only your metamask address can interact with the contract through the relayer.
            </div>
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
      case 'gasless-upgrade':
        return this.renderGaslessUpgrade();
      case 'counter':
        return this.renderCounterSetup();
      case 'gasless-counter':
        return this.renderGaslessCounterSetup();
      case 'faq':
        return this.renderFAQ();
      case 'evm':
        return this.renderEVM();
      default:
        return this.renderSetup();
    }
  }
}
