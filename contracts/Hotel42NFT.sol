// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./IH42P.sol";

contract Hotel42NFT is ERC721URIStorage, Ownable {
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

    //tokenID to URIs
    mapping(uint256 => string) private _tokenURIs;

    // map of addresses to an array of reservation nft Id's
    // so in the /profile page we can query and view all reservations
    // belonging to a specific owner
    mapping(address => uint256[]) ownerToReservations;
    mapping(address => mapping(uint256 => uint256)) hotelAccountBalances;

    Counters.Counter private _tokenIdCounter;

    constructor(address _usdcAddress) ERC721("Hotel42", "H42") {
        usdcAddress = _usdcAddress;
    }

    /* event to store token ID in FE for each NFT.
        Reason - each user will have multiple token IDs so when res. needs updating we need to know which token ID to update */
    event ReservationMinted(
        uint256 indexed tokenID,
        address indexed hotelContract,
        uint256 indexed hotelId
    );

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _tokenIdCounter.increment();
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
        uint256 tokenId = _tokenIdCounter.current();
        (uint256 price, address owner) = IH42P(_hotelContract).getPaymentInfo(
            _hotelId,
            _roomTypeId
        );
        IERC20(usdcAddress).transferFrom(msg.sender, owner, price);

        _safeMint(msg.sender, tokenId);
        ownerToReservations[msg.sender].push(tokenId);

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

        _tokenIdCounter.increment();

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

    function getTokenURI(uint256 tokenID) public view returns (string memory) {
        return _tokenURIs[tokenID];
    }

    // function updateReservation(
    //     uint256 tokenID,
    //     string memory _firstName,
    //     string memory _lastName,
    //     string memory _email
    // ) public {
    //     // TODO (aaftab), I think we want to update IPFS here
    // }

    function getReservationsByOwner() public view returns (uint256[] memory) {
        return ownerToReservations[msg.sender];
    }
}
