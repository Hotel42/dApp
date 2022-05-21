// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol"; // TODO: might need to change if this changes in hotel42NFT.sol
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
// import "@openzeppelin/contracts/security/ReentrancyGuard.sol"; TODO: this is probably needed

contract Hotel42Marketplace is Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _marketListingCounter;

    struct MarketListing {
        address payable seller;
        uint256 price;
    }

    struct ERC721Reference {
        address nftContract;
        uint256 tokenId;
    }

    mapping(address => mapping(uint256 => MarketListing)) public listingsByContract;
    mapping(uint256 => ERC721Reference) public marketItemReference;
    uint256[] public marketListingIds;

    event MarketItemCreated(uint256 indexed marketListingId, address indexed nftContract, uint256 tokenId);
    event MarketItemDeleted(uint256 indexed marketListingId, address indexed nftContract, uint256 tokenId);
    event MarketItemSold(uint256 indexed marketListingId, address indexed nftContract, uint256 tokenId);

    // TODO: listing fee?

    function requireApproval(address _nftContract, uint256 _tokenId) private view {
        require(IERC721(_nftContract).getApproved(_tokenId) == address(this), "The market must be approved for the NFT");
    }

    function createMarketItem(address _nftContract, uint256 _tokenId, uint256 _sellPrice) public {
        requireApproval(_nftContract, _tokenId);
        uint256 marketListingId = _marketListingCounter.current();

        MarketListing memory newMarketListing = MarketListing({
            seller: payable(msg.sender),
            price: _sellPrice
        });

        ERC721Reference memory newERC721Reference = ERC721Reference({
            nftContract: _nftContract,
            tokenId: _tokenId
        });

        marketListingIds.push(marketListingId);
        marketItemReference[marketListingId] = newERC721Reference;
        listingsByContract[_nftContract][_tokenId] = newMarketListing;
        _marketListingCounter.increment();

        emit MarketItemCreated(marketListingId, _nftContract, _tokenId);
    }

    function purchaseMarketItem(uint256 _marketListingId) public payable {
        ERC721Reference memory nftReference = marketItemReference[_marketListingId];
        MarketListing memory listing = listingsByContract[nftReference.nftContract][nftReference.tokenId];
        requireApproval(nftReference.nftContract, nftReference.tokenId);
        require(msg.value >= listing.price, "Value does not meet asking price");

        // TODO: send payment to seller and add payment tests!

        IERC721(nftReference.nftContract).transferFrom(listing.seller, msg.sender, nftReference.tokenId);
        emit MarketItemSold(_marketListingId, nftReference.nftContract, nftReference.tokenId);
        removeMarketItem(_marketListingId, nftReference.nftContract, nftReference.tokenId);
    }

    function removeMarketItem(uint256 _marketListingId, address _nftContract, uint256 _tokenId) private {
        uint deletedListingIdIdx;
        
        for(uint i; i < marketListingIds.length; i++) {
            if(marketListingIds[i] == _marketListingId) {
                deletedListingIdIdx = i;
                break;
            }
        }

        delete listingsByContract[_nftContract][_tokenId];
        delete marketItemReference[_marketListingId];

        marketListingIds[deletedListingIdIdx] = marketListingIds[marketListingIds.length - 1];
        marketListingIds.pop();
    }

    function deleteMarketListing(uint256 _marketListingId) public {
        ERC721Reference memory nftReference = marketItemReference[_marketListingId];
        MarketListing memory listing = listingsByContract[nftReference.nftContract][nftReference.tokenId];
        require(listing.seller == msg.sender, "Only original lister can delist a market item");


        emit MarketItemDeleted(_marketListingId, nftReference.nftContract, nftReference.tokenId);
        removeMarketItem(_marketListingId, nftReference.nftContract, nftReference.tokenId);
    }
}
