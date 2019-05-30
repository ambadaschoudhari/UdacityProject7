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
## Test results
Part 1:
   Requirement 1	Project write-up - UML ==> results\Udacity Project 7.pptx
   Requirement 2	Project write-up - Libraries ==> Present in package.json
   Requirement 3	Project write-up - IPFS ==> Not used

Part 2: ==> Git link https://github.com/ambadaschoudhari/UdacityProject7/tree/master/SourceCode/contracts
Requirement 1	Define and implement interfaces  
Requirement 2	Build out AccessControl Contracts
Requirement 3	Build out Base Contract
Requirement 4	Build out Core Contract

Part 3:Requirement: Smart contract has associated tests
TestSupplychain.js has all the tests: Test using Ganache are : ESCrafts - Ganache Test Results.pdf
Remember to change ownerID in 2_deploy_contracts.js

Requirement 1: Deploy smart contract on a public test network
Requirement 2: Submit Contract Address
Transaction Hash: 0x8b209489761b8f148ac4885641d7e2feaab4c6a47c964114629f1b16942e45e1 
Account: 0x66fc100dd6b011c050f1e17625184a5983523e4f 
Contract Address: 0x65f6e720f7ac1c19757cb0bbf55291243a7e46e6
log file : results\Rinkeby Deployment.txt

Part 5: Modify client code to interact with smart contract
Requirement: Configure client code for each actor
app.js has been modified
Test using Ganache and web are : results\ESCrafts - Web Ganache Test Results.pdf

## Authors


## Acknowledgments

* Solidity
* Ganache-cli
* Truffle
* IPFS
