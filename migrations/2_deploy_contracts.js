// contract used for the drone demo
var Blackbox = artifacts.require("./Blackbox.sol");
// contract used for the web demo
var Blockbox = artifacts.require("./Blockbox.sol");

module.exports = function(deployer) {
  deployer.deploy(Blackbox);
  deployer.deploy(Blockbox);
};
