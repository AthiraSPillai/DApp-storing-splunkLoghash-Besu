
const PrivateKeyProvider = require("@truffle/hdwallet-provider");
const HDWalletProvider = require('@truffle/hdwallet-provider');

// insert the private key of the account used in metamask eg: Account 1 (Miner Coinbase Account)
const privateKey = "c87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";

const fs = require('fs');

const mnemonic = fs.readFileSync("./secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  networks: {
   
    development: {
      provider: () => new PrivateKeyProvider(privateKey, "http://localhost:8545"),
      network_id: "*" // Match any network id
      },
    ropsten:{
      provider: function() {
        return new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/a7bfe647ac3246a28407b10112832e9d")
      },
      network_id: 3,
      gas: 400000      //make sure this gas allocation isn't over 4M, which is the max
    }
  }
};
