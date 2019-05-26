pragma solidity ^0.5.0;
//import "./WoodPickerRole.sol";
 

// Define a contract 'Supplychain'
contract SupplyChain {

  // Define 'owner'
  address payable owner;

  // Define a variable called 'upc' for Universal Product Code (UPC)
  uint32  upc;

  // Define a variable called 'sku' for Stock Keeping Unit (SKU)
  uint32  sku;

  // Define a public mapping 'items' that maps the UPC to an Item.
  mapping (uint32 => Item) items;

  // Define a public mapping 'itemsHistory' that maps the UPC to an array of TxHash, 
  // that track its journey through the supply chain -- to be sent from DApp.
  mapping (uint32 => string[]) itemsHistory;
  
  // Define enum 'State' with the following values:
  enum State 
  { 
    Tagged,     // 0
    Approved,   // 1
//  Pieced,     // 2
    Crafted,    // 3
    Sold        // 4
    }

  State constant defaultState = State.Tagged;

  // Define a struct 'Item' with the following fields:
  struct Item {
    uint32    sku;  // Stock Keeping Unit (SKU)
    uint32    upc; // Universal Product Code (UPC), generated by the WoodPicker, goes on the package, can be verified by the Consumer
    address ownerID;  // Metamask-Ethereum address of the current owner as the product moves through 8 stages
    address originWoodPickerID; // Metamask-Ethereum address of the WoodPicker
    string  originWoodLandName; // WoodPicker Name
    string  originWoodLandInformation;  // WoodPicker Information
    string  originWoodLandLatitude; // WoodLand Latitude
    string  originWoodLandLongitude;  // WoodLand Longitude
    uint    productID;  // Product ID potentially a combination of upc + sku
    
    string  productNotes; // Product Notes
    uint    productPrice; // Product Price
    State   itemState;  // Product State as represented in the enum above
    address regulatorID;  // Metamask-Ethereum address of the Regulator
    address craftsmanID;  // Metamask-Ethereum address of the craftsman
    address payable retailerID; // Metamask-Ethereum address of the Retailer
    address payable consumerID; // Metamask-Ethereum address of the Consumer
  }

  // Define 8 events with the same 8 state values and accept 'upc' as input argument
  event evntTagged(uint32 upc);
  event evntApproved(uint32 upc);
 // event Pieced(uint upc);
  event evntCrafted(uint32 upc);
  event evntSold(uint32 upc);
   // Define a modifer that checks to see if msg.sender == owner of the contract
  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // Define a modifer that verifies the Caller
  //??? What shall be parameter that is to be passed??
  modifier verifyCaller (address _address) {
    require(msg.sender == _address); 
    _;
  }

  // Define a modifier that checks if the paid amount is sufficient to cover the price
  modifier paidEnough(uint _price) { 
    require(msg.value >= _price); 
    _;
  }
  
  // Define a modifier that checks the price and refunds the remaining balance
  modifier checkValue(uint32 _upc) {
    _;
    uint _price = items[_upc].productPrice;
    uint amountToReturn = msg.value - _price;
    items[_upc].consumerID.transfer(amountToReturn);

  }

  // Define a modifier that checks if an item.state of a upc is Tagged
  modifier tagged(uint32 _upc) {
    require(items[_upc].itemState == State.Tagged);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Approved
  modifier approved(uint32 _upc) {
    require(items[_upc].itemState == State.Approved);
    _;
  }
  
  /*
  // Define a modifier that checks if an item.state of a upc is Pieced
  modifier pieced(uint _upc) {
    require(items[_upc].itemState == State.Pieced);
    _;
  } */

  // Define a modifier that checks if an item.state of a upc is Crafted
  modifier crafted(uint32 _upc) {
    require(items[_upc].itemState == State.Crafted);
    _;
  }

  // Define a modifier that checks if an item.state of a upc is Sold
  modifier sold(uint32 _upc) {
    require(items[_upc].itemState == State.Sold);
    _;
  }
   
  // In the constructor set 'owner' to the address that instantiated the contract
  // and set 'sku' to 1
  // and set 'upc' to 1
  constructor() public payable {
    owner = msg.sender;
    sku = 1;
    upc = 1;
  }

  // Define a function 'kill' if required
  function kill() public {
    if (msg.sender == owner) {
      selfdestruct(owner);
    }
  }

 // Define a function 'tagItem' that allows a woodpicker to mark an item 'Tagged'
 function tagItem(uint32 _upc, address _originWoodPickerID,
                string memory _originWoodLandName,
                string memory _originWoodLandInformation,
                string memory _originWoodLandLatitude,
                string memory _originWoodlandLongitude,
                string memory _productNotes
            ) public 
  {
    // Add the new item as part of Harvest
    Item memory newItem = Item(sku,
                               _upc,
                               msg.sender,
                               _originWoodPickerID,
                               _originWoodLandName,
                               _originWoodLandInformation,
                               _originWoodLandLatitude,
                               _originWoodlandLongitude,
                               sku,
                               _productNotes,
                               0,
                               State.Tagged,
                               address(0),address(0),address(0),address(0));
    items[_upc] = newItem;

    owner=msg.sender;

    // Increment sku
    sku = sku + 1;

    // Emit the appropriate event
    emit evntTagged(_upc);
  }

//================================================================================
  // Define a function 'approveItem' that allows regulator to mark an item 'Approved'
  function approveItem(uint32 _upc) public  tagged(_upc) // verifyCaller
  // Call modifier to check if upc has passed previous supply chain stage
  
  // Call modifier to verify caller of this function
  
  {
    // Update the appropriate fields
    Item memory taggedItem = items[_upc];
    taggedItem.regulatorID = msg.sender;
    taggedItem.itemState = State.Approved;
    items[_upc] = taggedItem;
    // Emit the appropriate event
     emit evntApproved(_upc);
  }
/*
  // Define a function 'pieceItem' that allows LumpberJack to piece an item 'pieced'
  function pieceItem(uint _upc) public approved verifyCaller
  // Call modifier to check if upc has passed previous supply chain stage
  
  // Call modifier to verify caller of this function
  
  {
    // Update the appropriate fields
    Item memory approvedItem = items[_upc];
    approvedItem.LumberJackID = msg.sender;
    approvedItem.itemState = State.Pieced;
    items[_upc] = approvedItem;
     
    // Emit the appropriate event
    emit pieced(_upc);
  }
*/

//  Define a function 'CraftItem' that allows a Craftsman to mark an item 'Crafted' and is ready forsale
//  function CraftItem(uint _upc, uint _price) public pieced verifyCaller
  function CraftItem(uint32 _upc, uint _price) public approved(_upc)  //verifyCaller
  // Call modifier to check if upc has passed previous supply chain stage
  // Call modifier to verify caller of this function
  {
    // Update the appropriate fields
    Item memory approvedItem = items[_upc];
    approvedItem.craftsmanID = msg.sender;
    approvedItem.itemState = State.Crafted;
    approvedItem.productPrice = _price;
    items[_upc] = approvedItem;
    // Emit the appropriate event
    emit evntCrafted(_upc);
   }

/* check this out
  // Define a function 'buyItem' that allows the retailer to mark an item 'Sold'
  // Use the above defined modifiers to check if the item is available for sale, 
  // if the buyer has paid enough, 
  // and any excess ether sent is refunded back to the buyer
  //????How do we know the buyer ??
  function buyItem(uint32 _upc) public payable  crafted(_upc) paidEnough(unit price) checkValue (uinit32 _upc) //verifyCaller
    // Call modifier to check if upc has passed previous supply chain stage
    
    // Call modifer to check if buyer has paid enough
    
    // Call modifer to send any excess ether back to buyer
    
    {
    
    // Update the appropriate fields - ownerID, distributorID, itemState
    Item memory craftedItem = items[_upc];
    craftedItem.retailerID = msg.sender;
    craftedItem.itemState = State.Sold;
    items[_upc] = craftedItem;
    // Transfer money to farmer
    
    // emit the appropriate event
    emit evntSold(_upc);
  }

  

  // Define a function 'purchaseItem' that allows the consumer to mark an item 'Purchased'
  // Use the above modifiers to check if the item is received
  function purchaseItem(uint32 _upc) public 
    // Call modifier to check if upc has passed previous supply chain stage
    
    // Access Control List enforced by calling Smart Contract / DApp
    {
    // Update the appropriate fields - ownerID, consumerID, itemState
    
    // Emit the appropriate event
    
  }
*/
  // Define a function 'fetchItemBufferOne' that fetches the data
  function fetchItemBufferOne(uint32 _upc) public view returns 
  (
  uint32    itemSKU,
  uint32    itemUPC,
  address ownerID,
  address originWoodPickerID,
  string memory originWoodLandName,
  string memory originWoodLandInformation,
  string memory originWoodLandLatitude,
  string memory originWoodLandLongitude
  ) 
  {
  // Assign values to the 8 parameters
  Item memory fetchItem = items[_upc];
   itemSKU = fetchItem.sku;
  itemUPC = fetchItem.upc;
  ownerID = fetchItem.ownerID;
  originWoodPickerID = fetchItem.originWoodPickerID;
  originWoodLandName = fetchItem.originWoodLandName;
  originWoodLandInformation = fetchItem.originWoodLandInformation;
  originWoodLandLatitude = fetchItem.originWoodLandLatitude;
  originWoodLandLongitude = fetchItem.originWoodLandLongitude;

  return 
  (
  itemSKU,
  itemUPC,
  ownerID,
  originWoodPickerID,
  originWoodLandName,
  originWoodLandInformation,
  originWoodLandLatitude,
  originWoodLandLongitude
  );
  }

  // Define a function 'fetchItemBufferTwo' that fetches the data
  function fetchItemBufferTwo(uint32 _upc) public view returns 
  (
  uint32    itemSKU,
  uint32    itemUPC,
  uint    productID,
  string memory  productNotes,
  uint    productPrice,
  State    itemState,
  address regulatorID,
  address craftsmanID,
  address retailerID,
  address consumerID
  ) 
  {
    // Assign values to the 9 parameters
  Item memory fetchItem = items[_upc];
  itemSKU = fetchItem.sku;
  itemUPC = fetchItem.upc;
  productID = fetchItem.productID;
  productNotes = fetchItem.productNotes;
  productPrice = fetchItem.productPrice;
  itemState = fetchItem.itemState;
  regulatorID = fetchItem.regulatorID;
  craftsmanID = fetchItem.craftsmanID;
  retailerID = fetchItem.retailerID;
  consumerID = fetchItem.consumerID;
    
  return 
  (
  itemSKU,
  itemUPC,
  productID,
  productNotes,
  productPrice,
  itemState,
  regulatorID,
  craftsmanID,
  retailerID,
  consumerID
  );
  }
}
