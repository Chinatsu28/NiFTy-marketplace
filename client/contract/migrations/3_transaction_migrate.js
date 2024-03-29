const Tx = artifacts.require("Transaction");

module.exports = function(deployer) {
    deployer.deploy(Tx);
};