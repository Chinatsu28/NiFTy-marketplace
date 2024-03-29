const NFTS = artifacts.require("NFT");

module.exports = function(deployer) {
    deployer.deploy(NFTS);
};