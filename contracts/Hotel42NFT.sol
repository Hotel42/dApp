// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Hotel42NFT is ERC721, Ownable {
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

    mapping(uint => HotelReservation) hotelReservationNFTMap;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Hotel42", "H42") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _tokenIdCounter.increment();
    }

    function confirmReservation(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _hotelName,
        string memory _checkInDate,
        string memory _checkOutDate,
        string memory _roomType
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
        _safeMint(msg.sender, tokenId);
        hotelReservationNFTMap[tokenId] = reservation;
        _tokenIdCounter.increment();
    }
}
