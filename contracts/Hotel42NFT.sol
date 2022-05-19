// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

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
    mapping(uint256 => string) private _tokenURIs;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Hotel42", "H42") {}

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _tokenIdCounter.increment();
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return
            "https://gateway.pinata.cloud/ipfs/QmSzAckhtcBPTAfk71ejYEveBU92dnWob35dvBshUD4rqg/";
    }

    function confirmReservation(
        string memory _firstName,
        string memory _lastName,
        string memory _email,
        string memory _hotelName,
        string memory _checkInDate,
        string memory _checkOutDate,
        string memory _roomType,
        uint256 contentAddr
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

        string memory baseURI = _baseURI();
        string memory token_uri = string(
            abi.encodePacked(baseURI, Strings.toString(contentAddr))
        );

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, token_uri);
        hotelReservationNFTMap[tokenId] = reservation;
        _tokenIdCounter.increment();
    }
}
