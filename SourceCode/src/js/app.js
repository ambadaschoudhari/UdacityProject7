App = {
    web3Provider: null,
    contracts: {},
    emptyAddress: "0x0000000000000000000000000000000000000000",
    sku: 0,
    upc: 0,
    metamaskAccountID: "0x0000000000000000000000000000000000000000",
    ownerID: "0x0000000000000000000000000000000000000000",
    originWoodPickerID: "0x0000000000000000000000000000000000000000",
    originWoodLandName: null,
    originWoodLandInformation: null,
    originWoodLandLatitude: null,
    originWoodLandLongitude: null,
    productNotes: null,
    productPrice: 0,
    regulatorID: "0x0000000000000000000000000000000000000000",
    craftsmanID: "0x0000000000000000000000000000000000000000",
    retailerID: "0x0000000000000000000000000000000000000000",
    consumerID: "0x0000000000000000000000000000000000000000",

    init: async function () {
        App.readForm();
        /// Setup access to blockchain
        return await App.initWeb3();
    },

    readForm: function () {
        App.sku = $("#sku").val();
        App.upc = $("#upc").val();
        App.ownerID = $("#ownerID").val();
        App.originWoodPickerID = $("#originWoodPickerID").val();
        App.originWoodLandName = $("#originWoodLandName").val();
        App.originWoodLandInformation = $("#originWoodLandInformation").val();
        App.originWoodLandLatitude = $("#originWoodLandLatitude").val();
        App.originWoodLandLongitude = $("#originWoodLandLongitude").val();
        App.productNotes = $("#productNotes").val();
        App.productPrice = $("#productPrice").val();
        App.regulatorID = $("#regulatorID").val();
        App.craftsmanID = $("#craftsmanID").val();        
        App.retailerID = $("#retailerID").val();
        App.consumerID = $("#consumerID").val();
        App.iregulatorID = $("#iregulatorID").val();
        App.icraftsmanID = $("#icraftsmanID").val();        
        App.iretailerID = $("#iretailerID").val();
        App.iconsumerID = $("#iconsumerID").val();

        console.log(
            App.sku,
            App.upc,
            App.ownerID, 
            App.originWoodPickerID, 
            App.originWoodLandName, 
            App.originWoodLandInformation, 
            App.originWoodLandLatitude, 
            App.originWoodLandLongitude, 
            App.productNotes, 
            App.productPrice, 
            App.regulatorID,
            App.craftsmanID,             
            App.retailerID, 
            App.consumerID,
            App.iregulatorID,
            App.icraftsmanID,             
            App.iretailerID, 
            App.iconsumerID            
        );
    },

    initWeb3: async function () {
        /// Find or Inject Web3 Provider
        /// Modern dapp browsers...
        if (window.ethereum) {
            App.web3Provider = window.ethereum;
            try {
                // Request account access
                await window.ethereum.enable();
            } catch (error) {
                // User denied account access...
                console.error("User denied account access")
            }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
            App.web3Provider = window.web3.currentProvider;
        }
        // If no injected web3 instance is detected, fall back to Ganache
        else {
            App.web3Provider = new Web3.providers.HttpProvider('HTTP://127.0.0.1:7545');
        }

        App.getMetaskAccountID();

        return App.initSupplyChain();
    },

    getMetaskAccountID: function () {
        web3 = new Web3(App.web3Provider);

        // Retrieving accounts
        web3.eth.getAccounts(function(err, res) {
            if (err) {
                console.log('Error:',err);
                return;
            }
            console.log('getMetaskID:',res);
            App.metamaskAccountID = res[0];

        })
    },

    initSupplyChain: function () {
        /// Source the truffle compiled smart contracts
        var jsonSupplyChain='../../build/contracts/SupplyChain.json';
        
        /// JSONfy the smart contracts
        $.getJSON(jsonSupplyChain, function(data) {
            console.log('data',data);
            var SupplyChainArtifact = data;
            App.contracts.SupplyChain = TruffleContract(SupplyChainArtifact);
            App.contracts.SupplyChain.setProvider(App.web3Provider);
            
            App.fetchItemBufferOne();
            App.fetchItemBufferTwo();
            App.fetchEvents();

        });

        return App.bindEvents();
    },

    bindEvents: function() {
        $(document).on('click', App.handleButtonClick);
    },

    handleButtonClick: async function(event) {
        event.preventDefault();

        App.getMetaskAccountID();

        var processId = parseInt($(event.target).data('id'));
        console.log('processId',processId);

        switch(processId) {
            case 1:
                return await App.tagItem(event);
                break;
            case 2:
                return await App.approveItem(event);
                break;
            case 3:
                return await App.craftItem(event);
                break;
            case 4:
                return await App.buyItem(event);
                break;
            case 9:
                return await App.fetchItemBufferOne(event);
                break;
            case 10:
                return await App.fetchItemBufferTwo(event);
                break;
            }
    },

    tagItem: function(event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.tagItem(
                App.upc, 
                App.metamaskAccountID, 
                App.originWoodLandName, 
                App.originWoodLandInformation, 
                App.originWoodLandLatitude, 
                App.originWoodLandLongitude, 
                App.productNotes 
               ,App.iregulatorID
            );
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('TagItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    approveItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.approveItem(App.upc,App.icraftsmanID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('approveItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },
    
    craftItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));
        const productPrice = web3.toWei(.25, "ether");
        console.log('productPrice',productPrice);
        App.contracts.SupplyChain.deployed().then(function(instance) {
            return instance.craftItem(App.upc, App.productPrice,App.iretailerID, {from: App.metamaskAccountID});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('packItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },

    buyItem: function (event) {
        event.preventDefault();
        var processId = parseInt($(event.target).data('id'));

        App.contracts.SupplyChain.deployed().then(function(instance) {
            const walletValue = web3.toWei(.5, "ether");
            return instance.buyItem(App.upc,App.iconsumerID, {from: App.metamaskAccountID, value: walletValue});
        }).then(function(result) {
            $("#ftc-item").text(result);
            console.log('buyItem',result);
        }).catch(function(err) {
            console.log(err.message);
        });
    },


    fetchItemBufferOne: function () {
    ///   event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
        App.upc = $('#upc').val();
        console.log('upc',App.upc);

        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferOne(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferOne', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchItemBufferTwo: function () {
    ///    event.preventDefault();
    ///    var processId = parseInt($(event.target).data('id'));
                        
        App.contracts.SupplyChain.deployed().then(function(instance) {
          return instance.fetchItemBufferTwo.call(App.upc);
        }).then(function(result) {
          $("#ftc-item").text(result);
          console.log('fetchItemBufferTwo', result);
        }).catch(function(err) {
          console.log(err.message);
        });
    },

    fetchEvents: function () {
        if (typeof App.contracts.SupplyChain.currentProvider.sendAsync !== "function") {
            App.contracts.SupplyChain.currentProvider.sendAsync = function () {
                return App.contracts.SupplyChain.currentProvider.send.apply(
                App.contracts.SupplyChain.currentProvider,
                    arguments
              );
            };
        }

        App.contracts.SupplyChain.deployed().then(function(instance) {
        var events = instance.allEvents(function(err, log){
          if (!err)
            $("#ftc-events").append('<li>' + log.event + ' - ' + log.transactionHash + '</li>');
        });
        }).catch(function(err) {
          console.log(err.message);
        });
        
    }
};

$(function () {
    $(window).load(function () {
        App.init();
    });
});
