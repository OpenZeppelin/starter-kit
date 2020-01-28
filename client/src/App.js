import React from 'react';

import { useWeb3Injected, useWeb3Network } from '@openzeppelin/network/react';
import Web3Info from './components/Web3Info/index.js';

import styles from './App.module.scss';

const infuraToken = '95202223388e49f48b423ea50a70e336';

function App() {
  const injected = useWeb3Injected();
  const isHttp = window.location.protocol === 'http:';
  const local = useWeb3Network('http://127.0.0.1:8545');
  const network = useWeb3Network(`wss://ropsten.infura.io/ws/v3/${infuraToken}`, {
    pollInterval: 10 * 1000,
  });

  return (
    <>
      <h1>OpenZeppelin Starter Kit</h1>
      <div className={styles.App}>
        {injected && <Web3Info title="Wallet Web3" web3Context={injected} />}
        {isHttp && <Web3Info title="Local Web3 Node" web3Context={local} />}
        {infuraToken && <Web3Info title="Infura Web3" web3Context={network} />}
      </div>
    </>
  );
}

export default App;
