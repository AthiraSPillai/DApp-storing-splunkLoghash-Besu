const HashFile = artifacts.require("HashFile");

module.exports = function (deployer) {
  deployer.deploy(HashFile);
};
