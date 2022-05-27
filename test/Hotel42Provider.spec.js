const { expect } = require("chai");
const { ethers } = require("hardhat");
const { doFreshDeploy } = require('./test-helpers');

const contractName = "Hotel42Provider";

module.exports = { hotel42NFTContractName: contractName }

describe(contractName, function async() {
  it("Successfully adds hotel", async function () {
    const hotel42Provider = await doFreshDeploy(contractName);
    await hotel42Provider.addHotel(
      'Hotel Shang-ri-la',
      'Denver',
      'CO',
      4,
      'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
    );
    const [hotel] = await hotel42Provider.getAllHotels();
    expect(hotel[0]).to.equal('Hotel Shang-ri-la');
  });
  it("Successfully adds room types by hotel id", async function () {
    const hotel42Provider = await doFreshDeploy(contractName);
    await hotel42Provider.addHotel(
      'Hotel Shang-ri-la',
      'Denver',
      'CO',
      4,
      'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
    );

    await hotel42Provider.addRoomTypeByHotelId(
      'Deluxe',
      950,
      0,
    );

    const [firstRoomType] = await hotel42Provider.getRoomTypesByHotelId(0);
    expect(firstRoomType[0]).to.equal('Deluxe');
    expect(firstRoomType[1].toNumber()).to.equal(950);
  });
});