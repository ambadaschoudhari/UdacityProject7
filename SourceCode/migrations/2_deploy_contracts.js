// migrating the appropriate contracts
//var WoodPickerRole = artifacts.require("./WoodPickerRole.sol");
//var RegulatorRole = artifacts.require("./RegulatorRole.sol");
//var CraftsmanRole = artifacts.require("./CraftsmanRole.sol");
//var RetailerRole = artifacts.require("./RetailerRole.sol");
//var ConsumerRole = artifacts.require("./ConsumerRole.sol");
var SupplyChain = artifacts.require("./SupplyChain.sol");
//var Ownable = artifacts.require("./Ownable.sol");

module.exports = function(deployer) {
 // deployer.deploy(WoodPickerRole);
  //deployer.deploy(RegulatorRole);
 // deployer.deploy(CraftsmanRole );
  //deployer.deploy(RetailerRole);
  //deployer.deploy(ConsumerRole);
  deployer.deploy(SupplyChain);
 // deployer.deploy(Ownable);
};
