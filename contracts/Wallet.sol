pragma solidity ^0.5.0;

import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/token/ERC20/StandaloneERC20.sol";
import "@openzeppelin/contracts-ethereum-package/contracts/ownership/Ownable.sol";
import "@openzeppelin/upgrades/contracts/Initializable.sol";

contract Wallet is Ownable {
  function transferERC20(IERC20 token, address to, uint256 amount) public onlyOwner returns (bool) {
    require(token.transfer(to, amount), "Token transfer failed.");
  }
}
