import React, { Component } from "react";
import getWeb3, { getGanacheWeb3 } from "./utils/getWeb3";
import Web3Info from "./components/Web3Info/index.js";
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

  getGanacheAddresses = async () => {
    if (!this.ganacheProvider) {
      this.ganacheProvider = getGanacheWeb3();
    }
    if (this.ganacheProvider) {
      return await this.ganacheProvider.eth.getAccounts();
    }
    return [];
  }

  componentDidMount = async () => {
    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3 = await getWeb3();
        const ganacheAccounts = await this.getGanacheAddresses();
        // Use web3 to get the user's accounts.
        const accounts = await web3.eth.getAccounts();
        // Get the contract instance.
        const networkId = await web3.eth.net.getId();
        const isMetaMask = web3.currentProvider.isMetaMask;
        let balance = accounts.length > 0 ? await web3.eth.getBalance(accounts[0]): web3.utils.toWei('0');
        balance = web3.utils.fromWei(balance, 'ether');
        this.setState({ web3, ganacheAccounts, accounts, balance, networkId, isMetaMask });
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

  renderLoader() {
    return (
      <div className={styles.loader}>
        <Loader size="80px" color="red" />
        <h3> Loading Web3, accounts, and contract...</h3>
        <p> Unlock your metamask </p>
      </div>
    );
  }

  render() {
    if (!this.state.web3) {
      return this.renderLoader();
    }
    return (
      <div className={styles.App}>
        <h1>Good to Go!</h1>
        <p>Zepkit has created your app.</p>
        <h2>See your web3 info below:</h2>
        <Web3Info {...this.state} />
      </div>
    );
  }
}

export default App;
