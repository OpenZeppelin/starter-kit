import chai from 'chai';
import {createMockProvider, deployContract, getWallets, solidity} from 'ethereum-waffle';
import WalletJSON from '../build/waffle/Wallet';
import ERC20JSON from '../build/waffle/StandaloneERC20.json';

chai.use(solidity);
const {expect} = chai;

describe('wallet', () => {
  let provider = createMockProvider();
  let [wallet, walletTo] = getWallets(provider);
  const value = 9000;
  let walletContract;
  let token;

  beforeEach(async () => {
    token = await deployContract(wallet, ERC20JSON);
    walletContract = await deployContract(wallet, WalletJSON);
  });

  it('should have rightful owner', async () => {
    await walletContract.initialize(wallet.address);
    expect(await walletContract.owner()).to.eq(wallet.address);
  });

  it('should return proper value', async () => {
    await walletContract.initialize(wallet.address);
    await token['initialize(string,string,uint8,uint256,address,address[],address[])']('token', 'TKN', 18, 1000, wallet.address, [], []);
    let transaction = await token.transfer(walletContract.address, 100);
    console.log((await provider.getTransactionReceipt(transaction.hash)).gasUsed.toNumber());
    await token.transfer(walletTo.address, 100);
    console.log(await token.paused());
    console.log((await token.balanceOf(walletContract.address)).toNumber());
    console.log((await token.balanceOf(wallet.address)).toNumber());
    console.log((await token.balanceOf(walletTo.address)).toNumber());
    console.log((await walletContract.balanceOfERC20(token.address)).toNumber());
    console.log(token.address, wallet.address, walletTo.address);
    transaction = await walletContract.transferERC20(token.address, walletTo.address, 10, { gasLimit: 40343 });
    console.log((await walletContract.estimate.transferERC20(token.address, walletTo.address, 10)).toNumber());
    console.log((await provider.getTransactionReceipt(transaction.hash)).gasUsed.toNumber());
  });

});
