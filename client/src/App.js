import React, { Component } from "react";
import Counter from "./contracts/Counter.json";
import getWeb3 from "./utils/getWeb3";
import Header from "./components/Header/index.js";
import Footer from "./components/Footer/index.js";
import Hero from "./components/Hero/index.js";
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
      const deployedNetwork = Counter.networks[networkId];
      if (deployedNetwork) {
        const instance = new web3.eth.Contract(
          Counter.abi,
          deployedNetwork && deployedNetwork.address,
        );
        // Set web3, accounts, and contract to the state, and then proceed with an
        // example of interacting with the contract's methods.
        this.setState({ web3, accounts, contract: instance }, this.getCount);
      } else {
        this.setState({ web3, accounts });
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }
  };

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
        {!this.state.contract && (
          <div>
            Your contracts are not deployed in this network. <br />
            Maybe you are in the wrong network?
          </div>
        )}
        {this.state.web3 && this.state.contract && (
          <div>
            <h1>Good to Go!</h1>
            <p>Your Truffle Box is installed and ready.</p>
            <h2>Counter Example</h2>
            <p>
              If your contracts compiled and migrated successfully, below will show
              a stored value of 0 (by default).
            </p>
            <p>
              Try changing the value stored on <strong>line 40</strong> of App.js.
            </p>
            <div>The stored value is: {this.state.count}</div>
          </div>
        )}
      </div>
    );
  }

  renderInstructions() {
    return (
      <div className={styles.wrapper}>
        <Hero />
        <Instructions />
      </div>
    );
  }

  render() {
    return (
      <div className={styles.App}>
        <Header />
          {this.state.route === 'setup' && this.renderInstructions()}
          {this.state.route === '' && this.renderBody()}
        <Footer />
      </div>
    );
  }
}

export default App;
