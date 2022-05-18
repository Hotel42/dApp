const { expect } = require("chai");
const { ethers } = require("hardhat");
const { doFreshDeploy } = require('./test-helpers');

describe("Hotel42Marketplace", function async() {
    it("Should set the right owner", async function () {
        const hotel42NFT = await doFreshDeploy();
        const [owner] = await ethers.getSigners();
        expect(await hotel42NFT.owner()).to.equal(owner.address);
    });
});
