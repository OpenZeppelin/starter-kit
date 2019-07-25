import React, { useState, useEffect, useRef } from 'react';
import { PublicAddress, Button } from 'rimble-ui';
import { Web3Context } from '@openzeppelin/network';
import styles from './Web3Info.module.scss';

export default function Web3Info(props) {
  const [wallet, setWallet] = useState({ accounts: [], balance: 0 });
  const [network, setNetwork] = useState({ networkId: null, networkName: null });
  const [providerName, setProviderName] = useState('');

  const web3ContextRef = useRef(null);

  useEffect(() => {
    const getWeb3 = async () => {
      const { web3Context } = props;
      web3ContextRef.current = web3Context;
      try {
        if (web3Context) {
          // Use web3 to get the user's accounts.
          web3Context.on(Web3Context.NetworkIdChangedEventName, (networkId, networkName) => {
            setNetwork({ networkId, networkName });
          });
          web3Context.on(Web3Context.AccountsChangedEventName, async accounts => {
            setWallet({ accounts, balance: await getBalance(web3Context) });
          });

          const { accounts, networkId, networkName, providerName } = web3Context;

          setProviderName(providerName);
          setNetwork({ networkId, networkName });
          setWallet({ accounts, balance: await getBalance(web3Context) });
        }
      } catch (error) {
        // Catch any errors for any of the above operations.
        alert(`Failed to load web3, accounts, or contract. Check console for details.`);
        console.error(error);
      }
    };
    getWeb3();
  }, [props.web3Context]);

  const getBalance = async web3Context => {
    const accounts = web3Context.accounts;
    const lib = web3Context.lib;
    let balance =
      accounts && accounts.length > 0 ? lib.utils.fromWei(await lib.eth.getBalance(accounts[0]), 'ether') : 'Unknown';
    return balance;
  };

  const requestAuth = async web3Context => {
    try {
      await web3Context.requestAuth();
    } catch (e) {
      console.error(e);
    }
  };

  const { networkId, networkName } = network;
  const { accounts, balance } = wallet;

  return (
    <div className={styles.web3}>
      <h3> {props.title} </h3>
      <div className={styles.dataPoint}>
        <div className={styles.label}>Network:</div>
        <div className={styles.value}>{networkId ? `${networkId} – ${networkName}` : 'No connection'}</div>
      </div>
      <div className={styles.dataPoint}>
        <div className={styles.label}>Your address:</div>
        <div className={styles.value}>
          <PublicAddress label="" address={accounts && accounts.length ? accounts[0] : 'Unknown'} />
        </div>
      </div>
      <div className={styles.dataPoint}>
        <div className={styles.label}>Your ETH balance:</div>
        <div className={styles.value}>{balance}</div>
      </div>
      <div className={styles.dataPoint}>
        <div className={styles.label}>Provider:</div>
        <div className={styles.value}>{providerName}</div>
      </div>
      {accounts && accounts.length ? (
        <div className={styles.dataPoint}>
          <div className={styles.label}>Accounts & Signing Status</div>
          <div className={styles.value}>Access Granted</div>
        </div>
      ) : !!networkId && providerName !== 'infura' ? (
        <div>
          <br />
          <Button onClick={() => requestAuth(web3ContextRef.current)}>Request Access</Button>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
