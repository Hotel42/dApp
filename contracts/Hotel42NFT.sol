// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IH42P.sol";

contract Hotel42NFT is ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    struct Reservation {
        uint256 hotelID;
        uint256 roomTypeID;
        string checkInDate;
        string checkOutDate;
        string city;
        string state;
        string hotelName;
        uint256 stars;
        string imageURL;
    }

    address usdcAddress;

    //token ID to reservation
    mapping(uint256 => Reservation) tokenIDToReservation;

    Counters.Counter private _tokenIdCounter;

    constructor(address _usdcAddress) ERC721("Hotel42", "H42") {
        _tokenIdCounter.increment(); // prevent tokenId from being zero (that's bad since it's "null" value)
        usdcAddress = _usdcAddress;
    }

    // The following functions are overrides required by Solidity.
    function _beforeTokenTransfer(address from, address to, uint256 tokenId)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, ERC721Enumerable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    /* event to store token ID in FE for each NFT.
        Reason - each user will have multiple token IDs so when res. needs updating we need to know which token ID to update */
    event ReservationMinted(
        uint256 indexed tokenID,
        address indexed hotelContract,
        uint256 indexed hotelId
    );

    function safeMint(address to) public onlyOwner {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/";
    }

    function confirmReservation(
        address _hotelContract,
        uint256 _hotelId,
        uint256 _roomTypeId,
        string memory _checkInDate,
        string memory _checkOutDate,
        string memory _city,
        string memory _state,
        string memory _hotelName,
        uint256 _stars,
        string memory _imageURL
    ) public {
        _tokenIdCounter.increment();
        uint256 tokenId = _tokenIdCounter.current();
        (uint256 price, address owner) = IH42P(_hotelContract).getPaymentInfo(
            _hotelId,
            _roomTypeId
        );
        IERC20(usdcAddress).transferFrom(msg.sender, owner, price);

        _safeMint(msg.sender, tokenId);

        Reservation memory new_res = Reservation(
            _hotelId,
            _roomTypeId,
            _checkInDate,
            _checkOutDate,
            _city,
            _state,
            _hotelName,
            _stars,
            _imageURL
        );
        tokenIDToReservation[tokenId] = new_res;

        emit ReservationMinted(tokenId, _hotelContract, _hotelId);
    }

    function settingTokenURI(string memory _ipfs_hash, uint256 tokenID) public {
        _setTokenURI(tokenID, _ipfs_hash);
    }

    function getPublicResData(uint256 tokenID)
        public
        view
        returns (Reservation memory)
    {
        return tokenIDToReservation[tokenID];
    }

    // TODO: get tokens of owner to return correct results
    // https://docs.openzeppelin.com/contracts/4.x/api/token/erc721#IERC721Enumerable-tokenOfOwnerByIndex-address-uint256-
    function tokensOfOwner() external view returns(uint256[] memory ownerTokens) {
        uint256 tokenCount = balanceOf(msg.sender);

        // TODO: tokenOfOwnerByIndex(address owner, uint256 index)
        /*
        Returns a token ID owned by owner at a given index of its token list.
        Use along with balanceOf to enumerate all of owner's tokens.
        */
    }
}