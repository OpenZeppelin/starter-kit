import Web3 from 'web3';

export async function web3() {
  let web3;
  // Modern dapp browsers...
  if (window.ethereum) {
    web3 = new Web3(window.ethereum);
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    web3 = window.web3;
    console.log('Injected web3 detected.');
  }

  if (web3) {
    // Request account access if needed
    await window.ethereum.enable();
    // Acccounts now exposed
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const isMetaMask = web3.currentProvider.isMetaMask;
    this.setState({ web3, accounts, networkId, isMetaMask });
  }
}
