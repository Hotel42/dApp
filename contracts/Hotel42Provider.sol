// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

contract Hotel42Provider {
  using Counters for Counters.Counter;
  Counters.Counter private _hotelIdCounter;

  struct Hotel {
    string name;
    string city;
    string state;
    uint stars;
    string imageUrl;
    uint256 id;
  }

  struct RoomType {
    string name;
    uint256 price;
  }

  mapping(uint => Hotel) hotelMap;
  Hotel[] hotelArray;
  mapping(uint => RoomType[]) hotelRoomTypes;

  function addHotel(
    string memory name,
    string memory city,
    string memory state,
    uint stars,
    string memory imageUrl
  ) public {
    uint256 hotelId = _hotelIdCounter.current();
    Hotel memory newHotel = Hotel(name, city, state, stars, imageUrl, hotelId);
    hotelMap[hotelId] = newHotel;
    hotelArray.push(newHotel);
    _hotelIdCounter.increment();
  }

  function getAllHotels() public view returns (Hotel[] memory) {
    return hotelArray;
  }

  function getHotelById(uint256 id) public view returns (Hotel memory) {
    require(id < _hotelIdCounter.current());
    return hotelMap[id];
  }

  function addRoomTypeByHotelId(string memory name, uint256 price, uint256 hotelId) public {
    require(hotelId < _hotelIdCounter.current());
    RoomType memory newRoom = RoomType(name, price);
    hotelRoomTypes[hotelId].push(newRoom);
  }

  function getRoomTypesByHotelId(uint256 hotelId) public view returns (RoomType[] memory) {
    require(hotelId < _hotelIdCounter.current());
    return hotelRoomTypes[hotelId];
  }

  constructor() { }
}
