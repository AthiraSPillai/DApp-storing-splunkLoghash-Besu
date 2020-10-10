

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
  
      });
  // 
      return App.bindEvents();
    },
  
  bindEvents: function(event) {
      $(document).on('click', '#clickme', App.uploadHash);
    //   event.preventDefault();
    console.log("event received")
      },
  
  uploadHash: function(event) {
    var time_interval_selected= $("#pastinterval:selected").text(); 
    var time_interval = parseInt($("#pastinterval").val()); 
    console.log("inside upload file")
    event.preventDefault();
    var getdataJSON = function (url, callback) {
  
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false,'admin','changeme1');
        // xhr.withCredentials = true;
  
        xhr.setRequestHeader("Authorization", 'Basic ' + window.btoa('admin:changeme1'));
        xhr.setRequestHeader('rejectUnauthorized','false');
        // xhr.responseType = 'json';
        
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
    req_time=this.time_interval
    var splunk_url="https://localhost:8089/services/search/jobs/export?earliest_time=-"+time_interval+"m&latest_time=now&output_mode=raw&search=search index=_internal";
    console.log("splunk_url--",splunk_url)
    console.log(typeof("*******",getdataJSON))
    getdataJSON(splunk_url,  function(err, data){
      console.log(err)
      console.log(data)
    
    
    
    
    
    // {
        
        if (err != null) {
            console.error(err);
        } else {
            
            console.log(JSON.stringify(data))
            var hashedData = web3.sha3(JSON.stringify(data));
            console.log(hashedData);
            console.log("Length of hash",hashedData.length)
            var fileInstance;
      web3.eth.getAccounts(function(error, accounts) {
        if (error) {
          console.log(error);
        }
        var account = accounts[0];
        console.log(account)
        App.contracts.HashFile.deployed().then(function(instance) {
          fileInstance = instance;
  
          // Execute a transaction by sending account
          return fileInstance.createHash(hashedData, {from: account});
        }).then(function(result) {
          console.log("success")
          // return App.markUploaded();
        }).catch(function(err) {
          console.log(err.message);
        });
      });
        }
    });

  
    
    },
  
  };
  
  $(function() {
    $(window).load(function() {
      App.init();
    });
  });
  