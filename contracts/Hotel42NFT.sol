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

    address usdcAddress;

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
    event ReservationMinted(uint indexed tokenID, address indexed hotelContract, uint256 indexed hotelId);

    function safeMint(address to) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _safeMint(to, tokenId);
        _tokenIdCounter.increment();
    }

    function _baseURI() internal pure override returns (string memory) {
        return "https://gateway.pinata.cloud/ipfs/";
    }

    function confirmReservation(string memory ipfs_hash, address _hotelContract, uint256 _hotelId, uint256 _roomTypeId) public {
        uint256 tokenId = _tokenIdCounter.current();
        (uint256 price, address owner) = IH42P(_hotelContract).getPaymentInfo(_hotelId, _roomTypeId);        
        IERC20(usdcAddress).transferFrom(msg.sender, owner, price);

        string memory token_uri = ipfs_hash;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, token_uri); //creates mapping of token ID -> baseURI + IPFS hash
        ownerToReservations[msg.sender].push(tokenId);
        _tokenIdCounter.increment();

        emit ReservationMinted(tokenId, _hotelContract, _hotelId);
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
