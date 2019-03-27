import chai from 'chai';
import {createMockProvider, deployContract, getWallets, solidity} from 'ethereum-waffle';
import Counter from '../build/waffle/Counter';

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
    expect(await counter.getCounter()).to.eq(value);
  });

  it('should have rightful owner', async () => {
    await counter.initialize(value);
    expect(await counter.owner()).to.eq(wallet.address);
  });

  it('should increase counter by right amount', async () => {
    const add = 234;
    await counter.initialize(value);
    await counter.increaseCounter(add);
    expect(await counter.getCounter()).to.eq(value + add);
  });

});
