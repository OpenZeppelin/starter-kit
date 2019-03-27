import chai from 'chai';
import {createMockProvider, deployContract, getWallets, solidity} from 'ethereum-waffle';
import Counter from '../build/contracts/Counter';

chai.use(solidity);
const {expect} = chai;

describe('counter', () => {
  let provider = createMockProvider();
  let [wallet, walletTo] = getWallets(provider);
  const value = 9000;
  let counter;

  beforeEach(async () => {
    counter = await deployContract(wallet, Counter);
  });

  it('should return proper value', async () => {
    await counter.initialize(value);
    expect((await counter.getCounter()).toNumber()).to.eq(value);
  });

});