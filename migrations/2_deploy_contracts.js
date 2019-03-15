var Counter = artifacts.require('./GaslessCounter.sol')
let networks = {
  'ropsten': {
    relayHubAddr: '0x1349584869A1C7b8dc8AE0e93D8c15F5BB3B4B87'
  },
  'development': {
    relayHubAddr: '0x9C57C0F1965D225951FE1B2618C92Eefd687654F'
  }
}
var RelayHub = artifacts.require( './RelayHub.sol');
module.exports = function (deployer, network) {
  console.log(RelayHub);
    let hubAddr = networks[network].relayHubAddr
    deployer.deploy(Counter).then(() => {
    let hub = RelayHub.at(hubAddr)
        return hub.depositFor(Counter.address, { value:1e18 })
    }).then(() => {
        console.log("Initializing Counter's Hub");
        return Counter.at(Counter.address).init_hub(hubAddr)
    }).catch(e => {
        console.log('error: ', e)
    })
}