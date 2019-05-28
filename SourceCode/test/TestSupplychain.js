// This script is designed to test the solidity smart contract - SuppyChain.sol -- and the various functions within
// Declare a variable and assign the compiled smart contract artifact
var SupplyChain = artifacts.require('SupplyChain')

contract('SupplyChain', function(accounts) {
    // Declare few constants and assign a few sample accounts generated by ganache-cli
    var sku = 1
    var upc = 1
    const ownerID = accounts[0]
    const originWoodPickerID = accounts[1]
    const originWoodLandName = "John Doe"
    const originWoodLandInformation = "Yarray Valley"
    const originWoodLandLatitude = "-38.239770"
    const originWoodLandLongitude = "144.341490"
    var productID = sku + upc
    const productNotes = "Best beans for Espresso"
   // const productPrice = web3.toWei(1, "ether")
    var itemState = 0
    const regulatorID = accounts[2]
    const craftsmanID = accounts[3]
    const retailerID = accounts[4]
    const consumerID = accounts[5]
    const emptyAddress = '0x00000000000000000000000000000000000000'

    ///Available Accounts
    ///==================
    ///(0) 0xbd8Be1884f5b7bccCf567c37e2844B82499CCE65
    ///(1) 0x2dcE7d6Fe2d371a8269068F520Db4b7A544E3405
    ///(2) 0x497F395B14B82d9F7b328BBDDCDe043843345f74
    ///(3) 0xEAA6dBc0aF6BEDa5866334bA9e17025b6fEb6335
    ///(4) 0x350c9faE06Fa0315A5d97DE422DDe2e35bfA2344
    ///(5) 0x3e237d35Fcc7C75516a71d805EdDEa7f0083Dd16
    ///(6)  
    ///(7)  
    ///(8)  
    ///(9)  

    console.log("ganache-cli accounts used here...")
    console.log("Contract Owner: accounts[0] ", originWoodPickerID)
    console.log("originWoodPickerID: accounts[0] ", originWoodPickerID)
    console.log("regulatorID: accounts[0] ", regulatorID)
    console.log("craftsmanID: accounts[0] ", craftsmanID)
    console.log("Retailer: accounts[0] ", retailerID)
    console.log("Consumer: accounts[1] ", consumerID)

    // 1st Test
    it("Testing smart contract function tagItem() that allows a woodpicker to Tag wood", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Tagged()
        // var event = supplyChain.evntTagged()
   
        // Mark an item as tagged by calling function TagItem()
        await supplyChain.addWoodPicker(originWoodPickerID, {from: originWoodPickerID});//, );
        await supplyChain.tagItem(upc, originWoodPickerID, 
                                  originWoodLandName, 
                                  originWoodLandInformation, 
                                  originWoodLandLatitude, 
                                  originWoodLandLongitude, 
                                  productNotes,regulatorID)

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferOne[2], ownerID, 'Error: Missing or Invalid ownerID')
        assert.equal(resultBufferOne[3], originWoodPickerID, 'Error: Missing or Invalid originWoodPickerID')
        assert.equal(resultBufferOne[4], originWoodLandName, 'Error: Missing or Invalid originWoodLandName')
        assert.equal(resultBufferOne[5], originWoodLandInformation, 'Error: Missing or Invalid originWoodLandInformation')
        assert.equal(resultBufferOne[6], originWoodLandLatitude, 'Error: Missing or Invalid originWoodLandLatitude')
        assert.equal(resultBufferOne[7], originWoodLandLongitude, 'Error: Missing or Invalid originWoodLandLongitude')
        assert.equal(resultBufferTwo[5], 0, 'Error: Invalid item State')
      //  assert.equal(eventEmitted, true, 'Invalid event emitted')        
    })    

    // 2nd Test
    it("Testing smart contract function approveItem to validate approveItem", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false
        
        // Watch the emitted event Processed()
        //--------------code to be added-----------------
       // var event = supplyChain.evntApproved()
        
        // Mark an item as approved by calling function approveItem()
        await supplyChain.addRegulator(regulatorID, {from: regulatorID});
        await supplyChain.approveItem(upc,craftsmanID,{from: regulatorID})
       // await event.watch((err, res) => {
       //     eventEmitted = true
       // })
        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferTwo[6], regulatorID, 'Error: Regulator ID is not matching')
        assert.equal(resultBufferTwo[5], 1, 'Error: Invalid item State')
       // assert.equal(eventEmitted, true, 'Invalid event emitted')  
      
    })    

    // 3rd Test
    it("Testing smart contract function CraftItem() that allows craftsman to create craft from wood", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false      
        
        // Watch the emitted event crafted()
         //--------------code to be added-----------------       

        // Mark an item as crafted by calling function packItem()
        await supplyChain.addCraftsMan(craftsmanID, {from:craftsmanID});
        await supplyChain.craftItem(upc,1,retailerID,{from:craftsmanID})

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferTwo[7], craftsmanID, 'Error: craftsmanID ID is not matching')
        assert.equal(resultBufferTwo[5], 2, 'Error: Invalid item State')
      //  assert.equal(eventEmitted, true, 'Invalid event emitted')         

     })    

    // 4th Test
    it("Testing smart contract function buyItem() that allows customer to buy item and pay retailer", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        var eventEmitted = false           
        let price =  web3.utils.toWei("10", "ether")
        // Watch the emitted event ForSale()
         //--------------code to be added-----------------          

        // Mark an item as sold by calling function buyItem()
        await supplyChain.addRetailer(retailerID, {from: retailerID});
        await supplyChain.addConsumer(consumerID, {from: consumerID});
        await supplyChain.buyItem(upc,consumerID,{from: retailerID, value: price})    

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        const resultBufferOne = await supplyChain.fetchItemBufferOne.call(upc)
        const resultBufferTwo = await supplyChain.fetchItemBufferTwo.call(upc)      

        // Verify the result set
        assert.equal(resultBufferOne[0], sku, 'Error: Invalid item SKU')
        assert.equal(resultBufferOne[1], upc, 'Error: Invalid item UPC')
        assert.equal(resultBufferTwo[8], retailerID, 'Error: retailerID ID is not matching')
        assert.equal(resultBufferTwo[9], consumerID, 'Error: consumerID ID is not matching')        
        assert.equal(resultBufferTwo[5], 3, 'Error: Invalid item State')          
    })   
 /**/
 /*
    // 5th Test
    it("Testing smart contract function buyItem() that allows a distributor to buy coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        
        
        // Watch the emitted event Sold()
        var event = supplyChain.Sold()
        

        // Mark an item as Sold by calling function buyItem()
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        

        // Verify the result set
        
    })    

    // 6th Test
    it("Testing smart contract function shipItem() that allows a distributor to ship coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        
        
        // Watch the emitted event Shipped()
        

        // Mark an item as Sold by calling function buyItem()
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        

        // Verify the result set
              
    })    

    // 7th Test
    it("Testing smart contract function receiveItem() that allows a retailer to mark coffee received", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        
        
        // Watch the emitted event Received()
        

        // Mark an item as Sold by calling function buyItem()
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        

        // Verify the result set
             
    })    

    // 8th Test
    it("Testing smart contract function purchaseItem() that allows a consumer to purchase coffee", async() => {
        const supplyChain = await SupplyChain.deployed()
        
        // Declare and Initialize a variable for event
        
        
        // Watch the emitted event Purchased()
        

        // Mark an item as Sold by calling function buyItem()
        

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        

        // Verify the result set
        
    })    

    // 9th Test
    it("Testing smart contract function fetchItemBufferOne() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        
        
        // Verify the result set:
        
    })

    // 10th Test
    it("Testing smart contract function fetchItemBufferTwo() that allows anyone to fetch item details from blockchain", async() => {
        const supplyChain = await SupplyChain.deployed()

        // Retrieve the just now saved item from blockchain by calling function fetchItem()
        
        
        // Verify the result set:
        
    })
*/
});

