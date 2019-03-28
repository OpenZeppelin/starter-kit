const { BN, constants, expectEvent, shouldFail } = require('openzeppelin-test-helpers');
const should = require('chai').should();

const Counter = artifacts.require('Counter');

contract("counter", async ([_, owner, ...otherAccounts]) => {
  let counter;
  const value = new BN(9999);
  const add = new BN(1);

  beforeEach(async function () {
    counter = await Counter.new();
    counter.initialize(value, { from: owner });
  });
  
  it("should have proper owner", async () => {
    (await counter.owner()).should.equal(owner);
  });

  it("should have proper default value", async () => {
    (await counter.getCounter()).should.bignumber.equal(value);
  });

  it("should increase counter value", async () => {
    await counter.increaseCounter(add);
    (await counter.getCounter()).should.bignumber.equal(value.add(add));
  });

});