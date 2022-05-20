const { ethers } = require("hardhat");

// prevents side effect from different tests with conflicting state
const doFreshDeploy = async (contractName) => {
    const hotel42NFTactory = await ethers.getContractFactory(contractName);
    const hotel42NFT = await hotel42NFTactory.deploy();
    await hotel42NFT.deployed();

    return hotel42NFT;
}

module.exports = { doFreshDeploy }
