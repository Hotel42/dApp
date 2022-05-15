// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

// NFT contract to inherit from.
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

// Helper functions OpenZeppelin provides.
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";

// sample contract code starter, to be worked on by team
contract ReservationMinter {
    address owner;

    struct Reservation {
        string hotelName;
        string checkinDate;
        string checkoutDate;
    }

    constructor() {
        owner = msg.sender;
    }


}