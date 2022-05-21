const { expect } = require("chai");
const { ethers } = require("hardhat");
const { doFreshDeploy } = require('./test-helpers');

const contractName = "Hotel42NFT";

module.exports = { hotel42NFTContractName: contractName }

describe(contractName, function async() {
    it("Should set the right owner", async function () {
        const hotel42NFT = await doFreshDeploy(contractName);
        const [owner] = await ethers.getSigners();
        expect(await hotel42NFT.owner()).to.equal(owner.address);
    });
    it("owner should be able to mint", async function () {
        const hotel42NFT = await doFreshDeploy(contractName);
        const [owner, giftedAccount] = await ethers.getSigners();
        const mintResult = await hotel42NFT.connect(owner).safeMint(giftedAccount.address);
        const ownerOfToken = await hotel42NFT.connect(owner).ownerOf(mintResult.value.toNumber());

        expect(ownerOfToken).to.equal(giftedAccount.address);
    });
    it("non-owner can't use onlyOwner mint", async function () {
        const hotel42NFT = await doFreshDeploy(contractName);
        const [, nonownerAccount] = await ethers.getSigners();

        await expect(hotel42NFT.connect(nonownerAccount).safeMint(nonownerAccount.address)
        ).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'");
    });
});