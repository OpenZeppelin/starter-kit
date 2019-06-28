import React, { Component } from 'react';
import { PublicAddress, Button } from 'rimble-ui';
import styles from './Wallet.module.scss';

export default class Wallet extends Component {
  render() {
    const { wallet, tokenOwner } = this.props;
    return (
      <div className={styles.wallet}>
        <h3> Your Wallet Contract Instance </h3>
        <div className={styles.dataPoint}>
          <div className={styles.label}>Instance address:</div>
          <div className={styles.value}>
            <PublicAddress address={wallet._address} />
          </div>
        </div>
        <div className={styles.dataPoint}>
          <div className={styles.label}>Are you the wallet owner:</div>
          <div className={styles.value}>{tokenOwner ? 'YES' : 'NO'}</div>
        </div>
        <div className={styles.label}>Wallet Actions</div>
        <div className={styles.buttons}>
          <Button disabled={!tokenOwner} onClick={() => this.props.renounce()} size="medium">
            Renounce Ownership
          </Button>
        </div>
      </div>
    );
  }
}
