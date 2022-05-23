const { ethers } = require("hardhat");

// prevents side effect from different tests with conflicting state
const doFreshDeploy = async (contractName, deployArgs = []) => {
    const contractFactory = await ethers.getContractFactory(contractName);
    const deployedContract = await contractFactory.deploy(...deployArgs);
    await deployedContract.deployed();

    return deployedContract;
}

const mintNft = async (nftContract, owner, nftRecipient) => {
    const mintResult = await nftContract.connect(owner).safeMint(nftRecipient.address);

    return { mintResult }
}

const deployAndMint = async (nftContractName, deployArgs = []) => {
    const nftContract = await doFreshDeploy(nftContractName, deployArgs);
    const [owner, nftRecipient] = await ethers.getSigners();
    const { mintResult } = await mintNft(nftContract, owner, nftRecipient)

    return { nftContract, owner, nftOwner: nftRecipient, mintResult };
}

const getFirstEventArgs = event => event[0].args

const MockUSDC = "MockUSDC";

module.exports = { doFreshDeploy, deployAndMint, mintNft, getFirstEventArgs, MockUSDC }
