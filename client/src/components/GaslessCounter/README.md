# Zepkit's Gasless Counter

In order to turn our standard Zepkit counter into a gasless counter which uses metatransactions and Tabookey's Gas Stations Network, a few simple changes are required.

## GaslessCounter Contract
The GaslessCounter contract now needs to extend Tabookey's RelayRecipient contract.

`contract GaslessCounter is Initializable, RelayRecipient`

In addition to extending RelayRecipient, we must also implement a number of functions

` function accept_relayed_call` This method is called by the relayer immediately before performing a transaction, and returns 0 if successful. This method can be used to restrict access to the contract's metatransactions, as is shown in the GaslessCounter tutorial. It can also be used to pay ERC20 token fees from the user to the contract.

  `function post_relayed_call` This method is called immediatly after a relay call has been performed and can be used to write information to the Ethereum log.

  `function init_hub` This method is used to set the contract's relay hub where it will accept relay calls from.
  
## Testing the Gasless Counter
In order to run a test environment version of our Gasless Counter, we need to set up a local Ethereum blockchain, deploy the relayhub and a relayer to make the transactions, and hook our Gasless Counter up to the relay hub.

1. Tabookey provides us with a Docker container which will deploy Ganache, the RelayHub contracts, and a Relayer for you.
2. Once these are set up, we need to deploy the Gasless Counter and point it at the RelayHub, we do this in the deploy_contracts file migrations dir.

`
    
    let counterAddr = Counter.networks[Object.keys(Counter.networks)[0]].address;
    
    let hubAddr = networks[network].relayHubAddr;
    
    let hub = RelayHub.at(hubAddr);
    
    hub.depositFor(Counter.address, { value:1e18 })
    
    console.log("Initializing Counter's Hub");
    
    Counter.at(counterAddr).init_hub(hubAddr)`
    
   
   As you can see above, we fund the contract on the RelayHub, and then link the hub in the Gasless Counter contract.
    
3. The final step required for our Web3 Application to start using relayed metatransactions is to set the web3 provider to Tabookey's relay provider. We do so in getWeb3.js under the utils dir in the 'useRelayer' function.
