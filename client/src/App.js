import React, { Component } from "react";
import Counter from "./contracts/Counter.json";
import getWeb3 from "./utils/getWeb3";

import "./App.css";

class App extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      console.log('web3.version', web3.version);
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
        console.log('instance', instance.methods);
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
    console.log('contract.methods', contract.methods.getCounter());
    // // Get the value from the contract to prove it worked.
    // const response = contract.methods.getCounter().call();
    // console.log('response', response);
    // // Update state with the result.
    // this.setState({ storageValue: response });
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

  render() {
    if (!this.state.web3) {
      return (
        <div>
          Loading Web3, accounts, and contract...
        </div>
      );
    }
    if (!this.state.contract) {
      return (
        <div>
          Wrong network
        </div>
      )
    }
    return (
      <div className="App">
        <h1>Good to Go!</h1>
        <p>Your Truffle Box is installed and ready.</p>
        <h2>Smart Contract Example</h2>
        <p>
          If your contracts compiled and migrated successfully, below will show
          a stored value of 5 (by default).
        </p>
        <p>
          Try changing the value stored on <strong>line 40</strong> of App.js.
        </p>
        <div>The stored value is: {this.state.storageValue}</div>
      </div>
    );
  }
}

export default App;
