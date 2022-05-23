// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

interface IH42P {
    function getPaymentInfo(uint _hotelId, uint _roomType) external view returns(uint256, address);
}