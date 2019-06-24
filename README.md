# ZepKit
A truffle box containing React, ZeppelinOS, OpenZeppelin, Truffle and Infura.

This box comes with everything you need to start using upgradeable Smart
contracts inside your applications. It also includes all the configuration
required to deploy to different networks.

## Requirements

Install ZeppelinOS, Ganache, and Truffle

```
npm install -g truffle@5.0.2 ganache-cli@6.3.0 zos
```

## Installation

First ensure you are in a new and empty directory.

Run the `unpack` command with `zepkit` to create a clean project. 

```javascript
zos unpack zepkit
```
If you are interested in running the `zepkit` tutorial, run `unpack` with `tutorial` as the argument.

```javascript
zos unpack tutorial
```

This will give you the tutorial app as listed on the http://zepkit.zeppelinos.org website.
Instructions for the tutorial are availible when you run the React app.

## Run

In a new terminal window, run your local blockchain:

```
ganache-cli --deterministic
```

In your original terminal window, at the top level of your folder, initialize the zeppelin os project
and follow the prompts:

```javascript
zos init zepkit
```

In the `client` directory, run the React app. Do this in a new terminal window. 

```javascript
cd client
npm run start
```

## Interact

You can interact directly with your smart contracts from the `zos` cli. 

   `zos transfer`                                        	
   
   send funds to a given address.

   `zos balance [address]`                               	
   
   query the ETH balance of the specified account, also supports ERC20s.

   `zos send-tx`                                         	
   
   sends a transaction to your contract and returns the events.

   `zos call`                                           	
   
   execute a constant method and receive back the value.


Type `zos` to see a complete list of availible commands.


## Test

Truffle can run tests written in Solidity or JavaScript against your smart contracts. Note the command varies slightly if you're in or outside of the truffle development console.

```javascript
// inside the development console.
test

// outside the development console..
truffle test
```

Jest is included for testing React components. Compile your contracts before running Jest, or you may receive some file not found errors.

```javascript
// ensure you are inside the client directory when running this
npm run test
```

## Build

To build the application for production, use the build script. A production build will be in the `client/build` folder.

```javascript
// ensure you are inside the client directory when running this
npm run build
```

## FAQ

* __How do I use this with the Ganache-CLI?__

    It's as easy as modifying the config file! [Check out our documentation on adding network configurations](http://truffleframework.com/docs/advanced/configuration#networks). Depending on the port you're using, you'll also need to update line 29 of `client/src/utils/getWeb3.js`.

* __Where is my production build?__

    The production build will be in the `client/build` folder after running `npm run build` in the `client` folder.

* __Where can I find more documentation?__

    This box is a marriage of [ZeppelinOS](https://zeppelinos.org/) and a React setup created with [create-react-app](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md). Either one would be a great place to start!
