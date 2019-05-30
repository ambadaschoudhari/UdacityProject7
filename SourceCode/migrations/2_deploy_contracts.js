// migrating the appropriate contracts
 var WoodPickerRole = artifacts.require("./WoodPickerRole.sol");
 var RegulatorRole = artifacts.require("./RegulatorRole.sol");
 var CraftsmanRole = artifacts.require("./CraftsmanRole.sol");
 var RetailerRole = artifacts.require("./RetailerRole.sol");
 var ConsumerRole = artifacts.require("./ConsumerRole.sol");
 var SupplyChain = artifacts.require("./SupplyChain.sol");
 var Roles = artifacts.require("./Roles.sol");
 //var Ownable = artifacts.require("./Ownable.sol");
 //const ownerID = "0x2dcE7d6Fe2d371a8269068F520Db4b7A544E3405";
 const ownerID = "0xbd8Be1884f5b7bccCf567c37e2844B82499CCE65";

module.exports = function(deployer) {
 //  deployer.deploy(WoodPickerRole, {from: ownerID});
 //  deployer.deploy(RegulatorRole, {from: ownerID});
 //  deployer.deploy(CraftsmanRole, {from: ownerID} );
 //  deployer.deploy(RetailerRole, {from: ownerID});
 //  deployer.deploy(ConsumerRole, {from: ownerID});
 //  deployer.deploy(Roles, {from: ownerID});   
 //  deployer.deploy(Ownable, {from: ownerID});
   deployer.deploy(SupplyChain, {from: ownerID});

 //  
};
