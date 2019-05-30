# Supply chain & data auditing

This repository containts an Ethereum DApp that demonstrates a Supply Chain flow between a Seller and Buyer. The user story is similar to any commonly used supply chain process. A Seller can add items to the inventory system stored in the blockchain. A Buyer can purchase such items from the inventory system. Additionally a Seller can mark an item as Shipped, and similarly a Buyer can mark an item as Received.

The DApp User Interface when running should look like...


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Please make sure you've already installed ganache-cli, Truffle and enabled MetaMask extension in your browser.

```
Give examples (to be clarified)
```

### Installing

A step by step series of examples that tell you have to get a development env running

Clone this repository:

```
git clone https://github.com/ambadaschoudhari/UdacityProject7
```

Change directory to ```SourceCode``` folder and install all requisite npm packages (as listed in ```package.json```):

```
cd SourceCode
npm install
```

Launch Ganache with your seedn word


Migrate smart contracts to the locally running blockchain, ganache-cli:

```
truffle migrate --reset

Update OwnerID field in 2_deploy_contracts.js. Also do not mention rinkeby 
```
Test smart contracts:

```
truffle test
```


## Authors


## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
