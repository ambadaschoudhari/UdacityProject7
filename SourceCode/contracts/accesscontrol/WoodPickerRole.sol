pragma solidity ^0.5.0;

// Import the library 'Roles'
import "./Roles.sol";

// Define a contract 'WoodPickerRole' to manage this role - add, remove, check
contract WoodPickerRole {
  using Roles for Roles.Role;

  // Define 2 events, one for Adding, and other for Removing
  event WoodPickerAdded(address indexed account);
  event WoodPickerRemoved(address indexed account);

  // Define a struct 'woodpicker' by inheriting from 'Roles' library, struct Role
  Roles.Role private woodpickers;

  // In the constructor make the address that deploys this contract the 1st woodpicker
  constructor() public {
    _addWoodPicker(msg.sender);
  }

  // Define a modifier that checks to see if msg.sender has the appropriate role
  modifier onlyWoodPicker() {
    require(isWoodPicker(msg.sender),"Sender must be WoodPicker");
    _;
  }

  // Define a function 'isWoodPicker' to check this role
  function isWoodPicker(address account) public view returns (bool) {
    return woodpickers.has(account);
  }

  // Define a function 'addWoodPicker' that adds this role - Anyone can add role
  function addWoodPicker(address account) public {  //} onlyWoodPicker {
    _addWoodPicker(account);
  }

  // Define a function 'renounceWoodPicker' to renounce this role
  function renounceWoodPicker() public {
    _removeWoodPicker(msg.sender);
  }

  // Define an internal function '_addWoodPicker' to add this role, called by 'addWoodPicker'
  function _addWoodPicker(address account) internal {
    woodpickers.add(account);
    emit WoodPickerAdded(account);
  }

  // Define an internal function '_removeWoodPicker' to remove this role, called by 'removeWoodPicker'
  function _removeWoodPicker(address account) internal {
    woodpickers.remove(account);
    emit WoodPickerRemoved(account);
  }
}