// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract Hotel42NFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    // map of addresses to an array of reservation nft Id's
    // so in the /profile page we can query and view all reservations
    // belonging to a specific owner
    mapping(address => uint256[]) ownerToReservations;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("Hotel42", "H42") {}

    /* event to store token ID in FE for each NFT.
        Reason - each user will have multiple token IDs so when res. needs updating we need to know which token ID to update */
    event reservationTokenID(uint256 tokenID);

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _tokenIdCounter.increment();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/";
    }

    function confirmReservation(string memory ipfs_hash) public {
        uint256 tokenId = _tokenIdCounter.current();

        string memory token_uri = ipfs_hash;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, token_uri); //creates mapping of token ID -> baseURI + IPFS hash
        ownerToReservations[msg.sender].push(tokenId);
        _tokenIdCounter.increment();

        emit reservationTokenID(tokenId);
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

    function purchaseBooking(
        address payable hotel,
        uint256 price //function is declared as payable so that funds are reverted if transaction fails
    ) public payable {
        require(msg.value >= price, "buyer has insufficient funds");
        hotel.transfer(msg.value);
    }
}
