const { expect } = require("chai");
const { ethers } = require("hardhat");
const { doFreshDeploy } = require('./test-helpers');

const contractName = "Hotel42Marketplace"

describe(contractName, function async() {
    it("Should set the right owner", async function () {
        const hotel42Marketplace = await doFreshDeploy(contractName);
        const [owner] = await ethers.getSigners();
        expect(await hotel42Marketplace.owner()).to.equal(owner.address);
    });
});
