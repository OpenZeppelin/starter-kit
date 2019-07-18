import React, { Component } from 'react';
import { fromInjected, fromConnection } from 'openzeppelin-network';
import Web3Info from './components/Web3Info/index.js';

import styles from './App.module.scss';

class App extends Component {
  render() {
    return (
      <div className={styles.App}>
        <br />
        <h1>BUIDL with Starter Kit</h1>
        <Web3Info title="Injected Web3" web3Factory={() => fromInjected()} />
        <br />
        <Web3Info title="Local Web3 Node" web3Factory={() => fromConnection('http://127.0.0.1:8545')} />
        <br />
        <Web3Info
          title="Infura Web3"
          web3Factory={() =>
            fromConnection('https://ropsten.infura.io/v3/95202223388e49f48b423ea50a70e336', {
              pollInterval: 10000,
            })
          }
        />
      </div>
    );
  }
}

export default App;
