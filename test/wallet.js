const { BN, constants, expectEvent, shouldFail } = require('openzeppelin-test-helpers');
const should = require('chai').should();

const Wallet = artifacts.require('Wallet');
const StandaloneERC20 = artifacts.require('StandaloneERC20');

contract("wallet", async ([_, owner, receiver, ...otherAccounts]) => {
  let wallet;
  let token;

  beforeEach(async function () {
    wallet = await Wallet.new();
    wallet.initialize(owner);
    token = await StandaloneERC20.new();
    token.initialize('Token', 'TKN', 18, 1000, owner, [], []);
  });

  it("should have proper owner", async () => {
    (await wallet.owner()).should.equal(owner);
  });

  it("should transfer ERC20 tokens from wallet to receiver", async () => {
    await token.transfer(wallet.address, 100, { from: owner });
    await wallet.transferERC20(token.address, receiver, 10, { from: owner });
    (await token.balanceOf(receiver)).should.bignumber.equal(new BN(10));
  });
  
});