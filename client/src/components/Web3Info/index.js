import React, { Component } from 'react';
import { PublicAddress, Button } from 'rimble-ui';
import { Web3Context } from 'openzeppelin-network';
import styles from './Web3Info.module.scss';

export default class Web3Info extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    const { web3Factory } = this.props;
    const web3Context = await web3Factory();
    try {
      if (web3Context) {
        // Use web3 to get the user's accounts.
        const providerName = web3Context.getProviderName();
        web3Context.on(Web3Context.NetworkIdChangedEventName, (networkId, networkName) => {
          this.setState({ networkId, networkName });
        });
        web3Context.on(Web3Context.AccountsChangedEventName, async accounts => {
          this.setState({ accounts, balance: await this.getBalance(web3Context) });
        });

        const { accounts, networkId, networkName } = web3Context;

        this.setState({
          accounts,
          networkId,
          networkName,
          providerName,
          requestAuth: () => this.requestAuth(web3Context),
        });

        this.setState({
          balance: await this.getBalance(web3Context),
        });
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3, accounts, or contract. Check console for details.`);
      console.error(error);
    }
  }

  componentWillUnmount() {
    this.web3Context.stopPoll();
  }

  async getBalance(web3Context) {
    const accounts = web3Context.accounts;
    const lib = web3Context.lib;
    let balance =
      accounts && accounts.length > 0 ? lib.utils.fromWei(await lib.eth.getBalance(accounts[0]), 'ether') : 'Unknown';
    return balance;
  }

  async requestAuth(web3Context) {
    try {
      await web3Context.requestAuth();
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    const { accounts, networkId, networkName, balance, providerName, requestAuth } = this.state;
    return (
      <div className={styles.web3}>
        <h3> {this.props.title} </h3>
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
            <Button onClick={() => requestAuth()}>Request Access</Button>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
