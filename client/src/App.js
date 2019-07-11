import React, { Component } from 'react';
import { fromInjected, fromConnection } from 'openzeppelin-network';
import Web3Info from './components/Web3Info/index.js';
import { Loader } from 'rimble-ui';

import styles from './App.module.scss';

class App extends Component {
  state = {
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null,
    route: window.location.pathname.replace('/', ''),
  };

  // getGanacheAddresses = async () => {
  //   if (!this.ganacheWeb3Context) {
  //     this.ganacheWeb3Context = fromConnection('http://0.0.0.0:8545');
  //   }
  //   if (this.ganacheWeb3Context) {
  //     return await this.ganacheWeb3Context.lib.eth.getAccounts();
  //   }
  //   return [];
  // };

  // if (context) {
  //   try {
  //     await context.requestAuth();
  //     resolve(context);
  //   } catch (err) {
  //     console.log('User rejected provider access');
  //   }
  // } else reject(new Error('Web3 provider is not injected.'));

  // const getGanacheWeb3 = () => {
  //   const isProd = process.env.NODE_ENV === 'production';
  //   if (isProd) {
  //     return null;
  //   }
  //   const context = fromConnection('http://0.0.0.0:8545');
  //   return context;
  // };

  componentDidMount = async () => {
    try {
      const isProd = process.env.NODE_ENV === 'production';
      if (!isProd) {
        // Get network provider and web3 instance.
        const web3Context = fromInjected();
        if (web3Context) {
          // Use web3 to get the user's accounts.
          const accounts = await web3Context.lib.eth.getAccounts();
          // Get the contract instance.
          const networkId = await web3Context.lib.eth.net.getId();
          console.log(web3Context.lib.currentProvider);
          const providerName = web3Context.getProviderName();
          let balance =
            accounts.length > 0 ? await web3Context.lib.eth.getBalance(accounts[0]) : web3Context.lib.utils.toWei('0');
          balance = web3Context.lib.utils.fromWei(balance, 'ether');
          this.setState({ web3Context, accounts, balance, networkId, providerName });
        }
      }
    } catch (error) {
      console.log(error);
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  };

  renderLoader() {
    return (
      <div className={styles.loader}>
        <h1> Please install and enable Metamask</h1>
      </div>
    );
  }

  render() {
    if (!this.state.web3Context) {
      return this.renderLoader();
    }
    return (
      <div className={styles.App}>
        <br />
        <h1>BUIDL with Starter kit</h1>
        <h2>Injected Web3 Context:</h2>
        <Web3Info {...this.state} />
      </div>
    );
  }
}

export default App;
