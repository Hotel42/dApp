const { expect } = require("chai");
const { ethers } = require("hardhat");
const { doFreshDeploy, MockUSDC } = require('./test-helpers');
const { onComplete: addHotelAndRooms } = require('../scripts/deployHotel42Provider');

const contractName = "Hotel42NFT";

module.exports = { hotel42NFTContractName: contractName }

describe(contractName, function async() {
    let mockUSDCcontract;
    let hotel42NFTProviderContract;
    let deployArgs;
    let hotel42NFT;

    beforeEach(async function () {
        // Get the ContractFactory and Signers here.
        const baseAmount = ethers.BigNumber.from("1000000000000000000")
        // const mockUSDCconstructorArgs = []
        let mockUSDCdeploy = await ethers.getContractFactory(MockUSDC);
        let hotel42NFTProviderDeploy = await ethers.getContractFactory("Hotel42Provider");

        hotel42NFTProviderContract = await hotel42NFTProviderDeploy.deploy();
        await hotel42NFTProviderContract.deployed();

        await addHotelAndRooms(hotel42NFTProviderContract);

        mockUSDCcontract = await mockUSDCdeploy.deploy(baseAmount.mul(ethers.BigNumber.from("1000000000")));
        deployArgs = [mockUSDCcontract.address]

        hotel42NFT = await doFreshDeploy(contractName, deployArgs);

        const [owner, addr1, addr2] = await ethers.getSigners();
        // mockUSDCcontract.transfer(addr1,)
        // spreadTheWealth(mockUSDCcontract)
        mockUSDCcontract.connect(owner).transfer(addr1, baseAmount.mul(ethers.BigNumber.from(100000)));
        mockUSDCcontract.connect(owner).transfer(addr2, baseAmount.mul(ethers.BigNumber.from(100000)));
    });

    it("Should set the right owner", async function () {
        const [owner] = await ethers.getSigners();
        expect(await hotel42NFT.owner()).to.equal(owner.address);
    });
    it("owner should be able to mint", async function () {
        const [owner, giftedAccount] = await ethers.getSigners();
        const mintResult = await hotel42NFT.connect(owner).safeMint(giftedAccount.address);
        const ownerOfToken = await hotel42NFT.connect(owner).ownerOf(mintResult.value.toNumber()); // TODO: fix NFT id check (value isn't the token ID)

        expect(ownerOfToken).to.equal(giftedAccount.address);
    });
    it("non-owner can't use onlyOwner mint", async function () {
        const [, nonownerAccount] = await ethers.getSigners();

        await expect(hotel42NFT.connect(nonownerAccount).safeMint(nonownerAccount.address)
        ).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'Ownable: caller is not the owner'");
    });

    it("should NOT be able to confirm reservation because of insuffient funds", async () => {
        const [, purchaser] = await ethers.getSigners();
        const TEST_IPFS_HASH = 'TEST_IPFS_HASH'

        await expect(hotel42NFT.connect(purchaser).confirmReservation(TEST_IPFS_HASH, hotel42NFTProviderContract.address, 0, 0)
        ).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'ERC20: insufficient allowance'");
    })

    it("should be able to confirm reservation", async () => {
        const [owner, purchaser] = await ethers.getSigners();
        const TEST_IPFS_HASH = 'TEST_IPFS_HASH'

        await mockUSDCcontract.connect(owner).transfer(purchaser.address, ethers.BigNumber.from(10000));
        await mockUSDCcontract.connect(purchaser).approve(hotel42NFT.address, 1500);

        await expect(hotel42NFT.connect(purchaser).confirmReservation(TEST_IPFS_HASH, hotel42NFTProviderContract.address, 0, 0)
        ).to.emit(hotel42NFT, "ReservationMinted").withArgs(0, hotel42NFTProviderContract.address, 0);
    })

    // TODO: reconsider how to set token URI
    it.skip("should set the right tokenURI", async function () {
        const TEST_IPFS_HASH = 'TEST_IPFS_HASH'
        const [owner] = await ethers.getSigners();
        await hotel42NFT.connect(owner).confirmReservation(TEST_IPFS_HASH); // TODO: fix args

        const tokenURI = await hotel42NFT.tokenURI(0);

        // TODO: should get baseURI from contract too
        expect(tokenURI).to.equal(`https://gateway.pinata.cloud/ipfs/${TEST_IPFS_HASH}`);
    });
});
