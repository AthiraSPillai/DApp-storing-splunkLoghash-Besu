# DApp-storing-splunkLoghash-Besu
A Simple DApp that stores hash of Splunks internal logs on Besu for integrity check of data .Also monitor the Node health and Transaction details using custom dashboards

## Prerequisites

- [Docker and Docker-compose](https://docs.docker.com/compose/install/)

- [Nodejs]vrersion>=10.0(https://nodejs.org/en/download/) and [Truffle](https://www.trufflesuite.com/truffle)  for the DApp

- MetaMask browser extension


## I. Private Besu development Network (PoW)Setup:
The development network(POW Besu) has 4 nodes 1 boot node, 1 rpc node , one miner and 1 peer
**To start services :**
```
Step1: cd Besu_Nodes
Step2. `./run.sh`
        //This will starts all the docker containers in POW mode
```
Wait for the network to be up because it creates the network and the same network is used by splunk and ethlogger to connect to
**To stop services :**

`./stop.sh` stops the entire network, and you can resume where it left off with `./resume.sh` 

`./remove.sh ` will first stop and then remove all containers and images
## II.  Splunk Connector for Ethereum(Ethlogger and Splunk) setup

Start splunk and Ethlogger by using command which will spin docker instances
```
step3: cd Besu_Splunk_EthereumConnector
Step4: docker-compose up -d
Wait for the splunk to be up and available at http://localhost:8000
username:admin
password:changeme1
```

## III. DApp and SmartContract

Start the DApp and deploy the smart contract to the network using truffle
```
step5: cd DApp_LogHash
step6: ./run-dapp.sh
```
Once the docker build is complete the app will be available at http://localhost:30001
![Image basic_pow](./DApp_LogHash/images/dapp.png)


```
Step7: docker ps 

To check all the containers are up and running

```
### iii. Invoke Smart Contracts & DApp (with MetaMask) to store splunk's last 5 minutes _internal logs

- Install [metamask](https://metamask.io/) as an extension in your browser
- Once you have setup your own private account, select 'My Accounts' by clicking on the avatar pic and then 'Import Account' and enter the following private_key: `0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3`

![Image dapp](./DApp_LogHash/images/dapp_metamask.png)

Open a new tab in your browser and go to `http://localhost:3001` select the time interval for the _internal logs and click the button , that will call the splunk REST endoint and render the _internal data , hash it and stores it in blockchain by interacting with the smart contract

![Image dapp](./DApp_LogHash/images/confirmed_transactions_onmetamask.png)


(NOTE: I was experiencing CORS and Certificate Issue on the browser for going SPLUNKS REST point http://localhost:8089
I have overcome CORS allow origin by adding * parameters to splunk.yml, certficate issue unfortunately I couldnt solve completely so I manually hit the API end point in the chrome browser for the first time  agreement and after that I can invoke contract for storing hash of the logfile from DApp )
https://admin:changeme1@localhost:8089/services/search/jobs/export?earliest_time=-1m&latest_time=now&output_mode=raw&search=search%20index=_internal net::ERR_CERT_AUTHORITY_INVALID or you can use an ngrok service to avoid this error.

### iii. Viewing Logs on Splunk and creating Splunk Dashboard
![Image dapp](./DApp_LogHash/images/splunk_logs.png)

A copy of the dashboard is copied over to the project directory as dashboard.xml


Referencs:
1:https://github.com/splunk/splunk-connect-for-ethereum
2.https://docs.splunk.com/Documentation/Splunk/8.0.6/SearchTutorial/Aboutdashboards
3.https://github.com/PegaSysEng/besu-sample-networks
4.SplukApp for Quorum: https://www.youtube.com/watch?v=Fo2qaEn1_BQ