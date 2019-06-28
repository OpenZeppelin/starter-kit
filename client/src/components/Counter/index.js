import React, { Component } from 'react';
import { PublicAddress, Button } from 'rimble-ui';
import styles from './Counter.module.scss';

export default class Counter extends Component {
  render() {
    const { contract, count } = this.props;
    return (
      <div className={styles.counter}>
        <h3> Your Counter Contract Instance </h3>
        <div className={styles.dataPoint}>
          <div className={styles.label}>Instance address:</div>
          <div className={styles.value}>
            <PublicAddress address={contract._address} />
          </div>
        </div>
        <div className={styles.dataPoint}>
          <div className={styles.label}>Counter Value:</div>
          <div className={styles.value}>{count}</div>
        </div>
        <div className={styles.label}>Counter Actions</div>
        <div className={styles.buttons}>
          <Button onClick={() => this.props.increase(1)} size="small">
            Increase Counter by 1
          </Button>
          <Button onClick={() => this.props.decrease(1)} disabled={!contract.methods.decreaseCounter} size="small">
            Decrease Counter by 1
          </Button>
        </div>
      </div>
    );
  }
}
