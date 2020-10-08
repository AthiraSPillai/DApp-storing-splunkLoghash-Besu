

App = {

  web3Provider: null,
  contracts: {},

  init: async function() {
    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
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
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:8545');
    }
    web3 = new Web3(App.web3Provider);

    return App.initContract();
  },

  initContract: function() {
    $.getJSON('HashFile.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with truffle-contract
      var fileArtifact = data;
      console.log(fileArtifact)
      App.contracts.HashFile = TruffleContract(fileArtifact);

      // Set the provider for our contract
      App.contracts.HashFile.setProvider(App.web3Provider);

      // Use our contract to retrieve and mark the adopted pets
      // return App.markUploaded();
    });
// 
    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.mui-btn--accent', App.uploadHash);
    console.log("event received")
  },

  uploadHash: function(event) {
    console.log("inside upload file")
    event.preventDefault();
  var getJSON = function(url, callback) {

      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, true,'admin','changeme1');
      xhr.withCredentials = true;

      xhr.setRequestHeader("Authorization", 'Basic ' + window.btoa('admin:changeme1'));
      xhr.setRequestHeader('rejectUnauthorized','false');
      xhr.responseType = 'json';
      
      xhr.onload = function() {
      
          var status = xhr.status;
          
          if (status == 200) {
              callback(null, xhr.response);
          } else {
              callback(status);
          }
      };
      
      xhr.send();
  };
  var splunk_url="https://localhost:8089/services/search/jobs/export?earliest_time=-5m&latest_time=now&output_mode=json&search=search index=_internal";

  getJSON(splunk_url,  function(err, data) {
      
      if (err != null) {
          console.error(err);
      } else {
          
          console.log(data)
          var hashedData = web3.sha3(JSON.stringify(data));
          console.log(hashedData);
            var fileInstance;
    web3.eth.getAccounts(function(error, accounts) {
      if (error) {
        console.log(error);
      }
      var account = accounts[0];
      App.contracts.HashFile.deployed().then(function(instance) {
        fileInstance = instance;

        // Execute a transaction by sending account
        return fileInstance.createCert(hashedData, {from: account});
      }).then(function(result) {
        console.log("success")
        // return App.markUploaded();
      }).catch(function(err) {
        console.log(err.message);
      });
    });
      }
  });
  
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
