const { ethers } = require("hardhat");

// prevents side effect from different tests with conflicting state
const doFreshDeploy = async (contractName) => {
    const contractFactory = await ethers.getContractFactory(contractName);
    const deployedContract = await contractFactory.deploy();
    await deployedContract.deployed();

    return deployedContract;
}

const mintNft = async (nftContract, owner, nftRecipient) => {
    const mintResult = await nftContract.connect(owner).safeMint(nftRecipient.address);

    return { mintResult }
}

const deployAndMint = async (nftContractName) => {
    const nftContract = await doFreshDeploy(nftContractName);
    const [owner, nftRecipient] = await ethers.getSigners();
    const { mintResult } = await mintNft(nftContract, owner, nftRecipient)

    return { nftContract, owner, nftOwner: nftRecipient, mintResult };
}

const getFirstEventArgs = event => event[0].args

module.exports = { doFreshDeploy, deployAndMint, mintNft, getFirstEventArgs }
