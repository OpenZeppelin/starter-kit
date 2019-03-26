pragma solidity ^0.5.0;

import "zos-lib/contracts/Initializable.sol";
import "tabookey-gasless/contracts/RelayRecipient.sol";


contract GaslessCounter is Initializable, RelayRecipient {
  //it keeps a count to demonstrate stage changes
  uint private count;
  address private _owner;
  mapping (address => bool) public whiteList;

  function initialize() initializer public {
    _owner = msg.sender;
    count = 0;
  }

  function owner() public view returns (address) {
    return _owner;
  }

  // getter
  function getCounter() public view returns (uint) {
    return count;
  }

  //and it can add to a count
  function increaseCounter(uint256 amount) public {
    count = count + amount;
  }

  function decreaseCounter(uint256 amount) public {
    require(count >= amount, "Cannot be lower than 0");
    count = count - amount;
  }

  function addToWhiteList(address grantedAddress) public {
    whiteList[grantedAddress] = true;
  }

  function accept_relayed_call(address /*relay*/, address from,
    bytes memory /*encoded_function*/, uint /*gas_price*/, 
    uint /*transaction_fee*/ ) public view returns(uint32) {
      // We'll invert this to control access to the relayer.
      require(!whiteList[from]);
      return 0;
  }

  function post_relayed_call(address /*relay*/, address /*from*/,
    bytes memory /*encoded_function*/, bool /*success*/,
    uint /*used_gas*/, uint /*transaction_fee*/ ) public {
  }

  function init_hub(RelayHub hub_addr) public {
    init_relay_hub(hub_addr);
  }
}
