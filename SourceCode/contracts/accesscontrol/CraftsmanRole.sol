pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'CraftsManRole' to manage this role - add, remove, check
contract CraftsManRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event CraftsManAdded(address indexed account);
  event CraftsManRemoved(address indexed account);

  // Define a struct 'craftsman' by inheriting from 'Roles' library, struct Role
  Roles.Role private craftsmen;

  // In the constructor make the address that deploys this contract the 1st craftsman
  constructor() public {
    _addCraftsMan(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyCraftsMan() {
    require(isCraftsMan(msg.sender),"Sender must be CradtsMan");
    _;
  }

  // Define a function 'isCraftsMan' to check this role
  function isCraftsMan(address account) public view returns (bool) {
    return craftsmen.has(account);
  }

  // Define a function 'addCraftsMan' that adds this role
  function addCraftsMan(address account) public onlyCraftsMan {
    _addCraftsMan(account);
  }

  // Define a function 'renounceCraftsMan' to renounce this role
  function renounceCraftsMan() public {
    _removeCraftsMan(msg.sender);
  }

  // Define an internal function '_addCraftsMan' to add this role, called by 'addCraftsMan'
  function _addCraftsMan(address account) internal {
    craftsmen.add(account);
    emit CraftsManAdded(account);
  }

  // Define an internal function '_removeCraftsMan' to remove this role, called by 'removeCraftsMan'
  function _removeCraftsMan(address account) internal {
    craftsmen.remove(account);
    emit CraftsManRemoved(account);
  }
}