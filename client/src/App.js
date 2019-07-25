import React from 'react';
import { useWeb3Injected, useWeb3Network } from '@openzeppelin/network';
import Web3Info from './components/Web3Info/index.js';

import styles from './App.module.scss';

function App() {
  const injected = useWeb3Injected();
  const local = useWeb3Network('http://127.0.0.1:8545');
  const network = useWeb3Network('wss://ropsten.infura.io/ws/v3/95202223388e49f48b423ea50a70e336', {
    pollInterval: 10 * 1000,
  });

  return (
    <div className={styles.App}>
      <br />
      <h1>BUIDL with Starter Kit</h1>
      <Web3Info title="Injected Web3" web3Context={injected} />
      <br />
      <Web3Info title="Local Web3 Node" web3Context={local} />
      <br />
      <Web3Info title="Infura Web3" web3Context={network} />
    </div>
  );
}

export default App;
