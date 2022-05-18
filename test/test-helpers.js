const { ethers } = require("hardhat");

// prevents side effect from different tests with conflicting state
const doFreshDeploy = async () => {
    const hotel42NFTactory = await ethers.getContractFactory("Hotel42NFT");
    const hotel42NFT = await hotel42NFTactory.deploy();
    await hotel42NFT.deployed();

    return hotel42NFT;
}

module.exports = { doFreshDeploy }
