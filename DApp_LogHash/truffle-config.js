
const PrivateKeyProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require('@truffle/hdwallet-provider');

// insert the private key of the account used in metamask eg: Account 1 (Miner Coinbase Account)
const privateKey = "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63";

const fs = require('fs');

const mnemonic = fs.readFileSync("./secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
   
    // development: {
    //   provider: () => new PrivateKeyProvider(privateKey, "http://localhost:8545"),
    //   network_id: "*", // Match any network id,
    //   gas: 400000      //make sure this gas allocation isn't over 4M, which is the max
    //   },
 
    development: {
      provider: () => new PrivateKeyProvider(privateKey, "http://localhost:8545"),
      network_id: "*"
    },
    ropsten:{
      provider: () => new PrivateKeyProvider(privateKey, "http://localhost:8545"),
      network_id: "*",
      gas: 400000      //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};
