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
        const ownerOfToken = await hotel42NFT.connect(owner).ownerOf(mintResult.value.toNumber()); // TODO: fix NFT id check (value isn't the token ID)

        expect(ownerOfToken).to.equal(giftedAccount.address);
    });
    it("non-owner can't use onlyOwner mint", async function () {
        const hotel42NFT = await doFreshDeploy(contractName);
        const [, nonownerAccount] = await ethers.getSigners();

        await expect(hotel42NFT.connect(nonownerAccount).safeMint(nonownerAccount.address)
        ).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'");
    });

    it("should set the right tokenURI", async function () {
        const TEST_IPFS_HASH = 'TEST_IPFS_HASH'
        const hotel42NFT = await doFreshDeploy(contractName);
        const [owner] = await ethers.getSigners();
        await hotel42NFT.connect(owner).confirmReservation(TEST_IPFS_HASH);

        const tokenURI = await hotel42NFT.tokenURI(0);

        // TODO: should get baseURI from contract too
        expect(tokenURI).to.equal(`https://gateway.pinata.cloud/ipfs/${TEST_IPFS_HASH}`);
    });
});
