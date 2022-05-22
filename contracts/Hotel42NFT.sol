// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Hotel42NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    struct HotelReservation {
        string firstName;
        string lastName;
        string email;
        string hotelName;
        string checkInDate;
        string checkOutDate;
        string roomType;
    }

    mapping(uint256 => HotelReservation) hotelReservationNFTMap;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Hotel42", "H42") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _tokenIdCounter.increment();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/";
    }

    /* event to store token ID in FE for each NFT. 
        Reason - each user will have multiple token IDs so when res. needs updating we need to know which token ID to update */
    event reservationTokenID(uint tokenID);     

    function confirmReservation(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _hotelName,
        string memory _checkInDate,
        string memory _checkOutDate,
        string memory _roomType,
        string memory ipfs_hash
    ) public {
        uint256 tokenId = _tokenIdCounter.current();
        HotelReservation memory reservation = HotelReservation({
            firstName: _firstName,
            lastName: _lastName,
            email: _email,
            hotelName: _hotelName,
            checkInDate: _checkInDate,
            checkOutDate: _checkOutDate,
            roomType: _roomType
        });

        string memory token_uri = ipfs_hash;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, token_uri); //creates mapping of token ID -> baseURI + IPFS hash
        hotelReservationNFTMap[tokenId] = reservation;
        _tokenIdCounter.increment();

        emit reservationTokenID(tokenId);
    }

    function updateReservation(uint256 tokenID, string memory _firstName, string memory _lastName, string memory _email) public {

        HotelReservation storage reservation = hotelReservationNFTMap[tokenID];
        reservation.firstName = _firstName;
        reservation.lastName = _lastName;
        reservation.email = _email;
    }
}
