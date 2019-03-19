var Counter = artifacts.require('./GaslessCounter.sol')
let networks = {
  'ropsten': {
    relayHubAddr: '0x1349584869A1C7b8dc8AE0e93D8c15F5BB3B4B87'
  },
  'development': {
    relayHubAddr: '0x9C57C0F1965D225951FE1B2618C92Eefd687654F',
  }
}
var RelayHub = artifacts.require( './RelayHub.sol');
module.exports = function (deployer, network) {
  console.log(RelayHub);
    let counterAddr = Counter.networks[Object.keys(Counter.networks)[0]].address;
    let hubAddr = networks[network].relayHubAddr;
    let hub = RelayHub.at(hubAddr);
    hub.depositFor(Counter.address, { value:1e18 })
    console.log("Initializing Counter's Hub");
    Counter.at(counterAddr).init_hub(hubAddr)
}