// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";
import "./IH42P.sol";

contract Hotel42Provider is IH42P {
  using Counters for Counters.Counter;
  Counters.Counter private _hotelIdCounter;
  Counters.Counter private _roomTypeIdCounter;

  struct Hotel {
    string name;
    string city;
    string state;
    uint stars;
    string imageUrl;
    uint256 id;
    address owner;
  }

  struct RoomType {
    string name;
    uint256 price;
    uint256 id;
  }

  mapping(uint => Hotel) hotelMap;
  Hotel[] hotelArray;
  mapping(uint => RoomType[]) hotelRoomTypes;
  mapping(uint => RoomType) roomTypeById;

  function addHotel(
    string memory name,
    string memory city,
    string memory state,
    uint stars,
    string memory imageUrl
  ) public {
    uint256 hotelId = _hotelIdCounter.current();
    Hotel memory newHotel = Hotel(name, city, state, stars, imageUrl, hotelId, msg.sender);
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

  // TODO: hotel should reference the roomTypeId
  function addRoomTypeByHotelId(string memory name, uint256 price, uint256 hotelId) public {
    require(hotelId < _hotelIdCounter.current());
    uint256 roomTypeId = _roomTypeIdCounter.current();
    RoomType memory newRoom = RoomType(name, price, roomTypeId);
    roomTypeById[roomTypeId] = newRoom;
    _roomTypeIdCounter.increment();
    hotelRoomTypes[hotelId].push(newRoom);
  }

  function getRoomTypesByHotelId(uint256 hotelId) public view returns (RoomType[] memory) {
    require(hotelId < _hotelIdCounter.current());
    return hotelRoomTypes[hotelId];
  }

  function getPaymentInfo(uint _hotelId, uint _roomtTypeId) public override view returns(uint256, address) {
    Hotel memory currentHotel = hotelMap[_hotelId];
    RoomType memory room = roomTypeById[_roomtTypeId];

    require(address(currentHotel.owner) != address(0), "Payment recipient can't be zero address");
    require(room.price != 0, "Price can't be zero");

    return (room.price, currentHotel.owner);
  }

  constructor() { }
}
