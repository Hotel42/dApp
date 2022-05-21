const { expect } = require("chai");
const { ethers } = require("hardhat");
const { doFreshDeploy, deployAndMint, mintNft, getFirstEventArgs } = require('./test-helpers');
const { hotel42NFTContractName } = require('./Hotel42NFT.spec');

const contractName = "Hotel42Marketplace"

const zeroAddress = '0x0000000000000000000000000000000000000000';
const approvalRevertErrorMsg = "VM Exception while processing transaction: reverted with reason string 'The market must be approved for the NFT'"

const listMarketItem = async ({ nftOwner, hotel42NFT, hotel42Marketplace, listingPrice, mintTokenId }) => {
    hotel42NFT.connect(nftOwner).approve(hotel42Marketplace.address, mintTokenId);

    const createTransaction = hotel42Marketplace.connect(nftOwner).createMarketItem(hotel42NFT.address, mintTokenId, listingPrice);

    await (await createTransaction).wait();

    const { marketListingId } = await hotel42Marketplace.queryFilter('MarketItemCreated').then(query => query[0].args);

    const { nftContract, tokenId } = await hotel42Marketplace.marketItemReference(marketListingId.toNumber())


    const { seller, price } = await hotel42Marketplace.listingsByContract(hotel42NFT.address, mintTokenId);

    return { createTransaction, marketListingId, nftContract, tokenId, seller, price };

}

describe(contractName, function async() {
    it("Should set the right owner", async function () {
        const hotel42Marketplace = await doFreshDeploy(contractName);
        const [owner] = await ethers.getSigners();
        expect(await hotel42Marketplace.owner()).to.equal(owner.address);
    });

    it("Should require approval before listing item", async function () {
        const hotel42Marketplace = await doFreshDeploy(contractName);

        const { nftContract: hotel42NFT, nftOwner, mintResult } = await deployAndMint(hotel42NFTContractName);

        await expect(hotel42Marketplace.connect(nftOwner).createMarketItem(hotel42NFT.address, mintResult.value.toNumber(), 0)
        ).to.be.revertedWith(approvalRevertErrorMsg);
    });

    it("nft owner can list item in market", async function () {
        const hotel42Marketplace = await doFreshDeploy(contractName);

        const { nftContract: hotel42NFT, nftOwner, mintResult } = await deployAndMint(hotel42NFTContractName);

        await mintResult.wait()
        const { tokenId: mintTokenId } = await hotel42NFT.queryFilter('Transfer').then(getFirstEventArgs);
        const listingPrice = 1000000

        const { createTransaction, nftContract, tokenId, seller, price } = await listMarketItem({ nftOwner, hotel42NFT, hotel42Marketplace, listingPrice, mintTokenId });

        await expect(createTransaction
        ).to.emit(hotel42Marketplace, "MarketItemCreated").withArgs(0, hotel42NFT.address, mintTokenId);

        expect(hotel42NFT.address).to.equal(nftContract);
        expect(mintTokenId.eq(tokenId)).to.be.true
        expect(seller).to.equal(nftOwner.address);
        expect(price.toNumber()).to.equal(listingPrice);
    });


    it("only the listing owner can delist", async function () {
        const hotel42Marketplace = await doFreshDeploy(contractName);

        const { nftContract: hotel42NFT, nftOwner, mintResult } = await deployAndMint(hotel42NFTContractName);

        await mintResult.wait()
        const { tokenId: mintTokenId } = await hotel42NFT.queryFilter('Transfer').then(getFirstEventArgs);
        const listingPrice = 1000000

        const { marketListingId } = await listMarketItem({ nftOwner, hotel42NFT, hotel42Marketplace, listingPrice, mintTokenId });

        const [, , stranger] = await ethers.getSigners();

        await expect(hotel42Marketplace.connect(stranger).deleteMarketListing(marketListingId)
        ).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'Only original lister can delist a market item'");
    });

    it("owner can delist an item", async function () {
        const hotel42Marketplace = await doFreshDeploy(contractName);

        const { nftContract: hotel42NFT, nftOwner, mintResult } = await deployAndMint(hotel42NFTContractName);

        await mintResult.wait()
        const { tokenId: mintTokenId } = await hotel42NFT.queryFilter('Transfer').then(getFirstEventArgs);
        const listingPrice = 1000000

        const { marketListingId } = await listMarketItem({ nftOwner, hotel42NFT, hotel42Marketplace, listingPrice, mintTokenId });

        const deleteTransaction = hotel42Marketplace.connect(nftOwner).deleteMarketListing(marketListingId)
        await expect(deleteTransaction
        ).to.emit(hotel42Marketplace, "MarketItemDeleted").withArgs(marketListingId, hotel42NFT.address, mintTokenId);

        const { nftContract, tokenId } = await hotel42Marketplace.marketItemReference(marketListingId.toNumber())

        expect(nftContract).to.equal(zeroAddress);
        expect(tokenId.toNumber()).to.equal(0);

        const { seller, price } = await hotel42Marketplace.listingsByContract(hotel42NFT.address, mintTokenId)

        expect(seller).to.equal(zeroAddress);
        expect(price.toNumber()).to.equal(0);
    });

    it("item that no longer has approval cannot be sold", async function () {
        const hotel42Marketplace = await doFreshDeploy(contractName);

        const { nftContract: hotel42NFT, nftOwner, mintResult } = await deployAndMint(hotel42NFTContractName);

        await mintResult.wait()
        const { tokenId: mintTokenId } = await hotel42NFT.queryFilter('Transfer').then(getFirstEventArgs);
        const listingPrice = 1000000

        const { marketListingId } = await listMarketItem({ nftOwner, hotel42NFT, hotel42Marketplace, listingPrice, mintTokenId });

        hotel42NFT.connect(nftOwner).approve(zeroAddress, mintTokenId);

        const [, , purchaser] = await ethers.getSigners();

        await expect(hotel42Marketplace.connect(purchaser).purchaseMarketItem(marketListingId)
        ).to.be.revertedWith(approvalRevertErrorMsg);
    });

    it("item that no does not meet asking price cannot be sold", async function () {
        const hotel42Marketplace = await doFreshDeploy(contractName);

        const { nftContract: hotel42NFT, nftOwner, mintResult } = await deployAndMint(hotel42NFTContractName);

        await mintResult.wait()
        const { tokenId: mintTokenId } = await hotel42NFT.queryFilter('Transfer').then(getFirstEventArgs);
        const listingPrice = 1000000

        const { marketListingId } = await listMarketItem({ nftOwner, hotel42NFT, hotel42Marketplace, listingPrice, mintTokenId });

        const [, , purchaser] = await ethers.getSigners();

        await expect(hotel42Marketplace.connect(purchaser).purchaseMarketItem(marketListingId)
        ).to.be.revertedWith("VM Exception while processing transaction: reverted with reason string 'Value does not meet asking price'");
    });

    it("item can be sold", async function () {
        const hotel42Marketplace = await doFreshDeploy(contractName);

        const { nftContract: hotel42NFT, nftOwner, mintResult } = await deployAndMint(hotel42NFTContractName);

        await mintResult.wait()
        const { tokenId: mintTokenId } = await hotel42NFT.queryFilter('Transfer').then(getFirstEventArgs);
        const listingPrice = 1000000

        const { marketListingId } = await listMarketItem({ nftOwner, hotel42NFT, hotel42Marketplace, listingPrice, mintTokenId });

        const [, , purchaser] = await ethers.getSigners();

        await expect(hotel42Marketplace.connect(purchaser).purchaseMarketItem(marketListingId, { value: listingPrice })
        ).to.emit(hotel42Marketplace, "MarketItemSold").withArgs(marketListingId, hotel42NFT.address, mintTokenId);

        const trueNftOwner = await hotel42NFT.connect(nftOwner).ownerOf(mintTokenId);

        expect(trueNftOwner).to.equal(purchaser.address);

        const { nftContract, tokenId } = await hotel42Marketplace.marketItemReference(marketListingId.toNumber())

        expect(nftContract).to.equal(zeroAddress);
        expect(tokenId.toNumber()).to.equal(0);

        const { seller, price } = await hotel42Marketplace.listingsByContract(hotel42NFT.address, mintTokenId)

        expect(seller).to.equal(zeroAddress);
        expect(price.toNumber()).to.equal(0);
    });
});
