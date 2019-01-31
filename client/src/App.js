import React, { Component } from "react";
import Counter from "./contracts/Counter.json";
import getWeb3 from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
import Web3Info from "./components/Web3Info/index.js";
import CounterUI from "./components/Counter/index.js";
import Instructions from "./components/Instructions/index.js";
import { Loader } from 'rimble-ui';

import styles from './App.module.scss';

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    route: window.location.pathname.replace("/","")
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = Counter.networks[networkId.toString()];
      const isMetaMask = web3.currentProvider.isMetaMask;
      let balance = await web3.eth.getBalance(accounts[0]);
      balance = web3.utils.fromWei(balance, 'ether');
      if (deployedNetwork) {
        const instance = new web3.eth.Contract(
          Counter.abi,
          deployedNetwork && deployedNetwork.address,
        );
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, balance, networkId,
          isMetaMask, contract: instance }, this.getCount);
        this.interval = setInterval(() => this.getCount(), 5000);
      } else {
        this.setState({ web3, accounts, balance, networkId,
          isMetaMask });
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  getCount = async () => {
    const { contract } = this.state;
    // Get the value from the contract to prove it worked.
    const response = await contract.methods.getCounter().call();
    // Update state with the result.
    this.setState({ count: response });
  };

  increaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.increaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  decreaseCount = async (number) => {
    const { accounts, contract } = this.state;
    await contract.methods.decreaseCounter(number).send({ from: accounts[0] });
    this.getCount();
  };

  renderBody() {
    return (
      <div className={styles.wrapper}>
        {!this.state.web3 && (
          <div className={styles.loader}>
            <Loader size="80px" color="red" />
            <h3> Loading Web3, accounts, and contract...</h3>
          </div>
        )}
        {this.state.web3 && !this.state.contract && (
          <div className={styles.setup}>
            <Web3Info {...this.state} />
            <div className={styles.notice}>
              Your contracts are not deployed in this network. <br />
              Maybe you are in the wrong network?
            </div>
            <Instructions key="counter" accounts={this.state.accounts} />
          </div>
        )}
        {this.state.web3 && this.state.contract && (
          <div className={styles.contracts}>
            <h1>Good to Go!</h1>
            <p>Interact with your contract on the right.</p>
            <div className={styles.widgets}>
              <Web3Info {...this.state} />
              <CounterUI
                decrease={this.decreaseCount}
                increase={this.increaseCount}
                {...this.state} />
            </div>
            {this.state.balance < 0.1 && (
              <Instructions name="metamask" accounts={this.state.accounts} />
            )}
            {this.state.balance >= 0.1 && (
              <Instructions name="upgrade" accounts={this.state.accounts} />
            )}
          </div>
        )}
      </div>
    );
  }

  renderInstructions() {
    return (
      <div className={styles.wrapper}>
        <Hero />
        <Instructions name="setup" accounts={this.state.accounts} />
      </div>
    );
  }

  renderFAQ() {
    return (
      <div className={styles.wrapper}>
        <Instructions name="faq" accounts={this.state.accounts} />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
          {this.state.route === '' && this.renderInstructions()}
          {this.state.route === 'counter' && this.renderBody()}
          {this.state.route === 'faq' && this.renderFAQ()}
        <Footer />
      </div>
    );
  }
}

export default App;
