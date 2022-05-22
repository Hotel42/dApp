
const hre = require("hardhat");

async function main() {
  const Hotel42Provider = await hre.ethers.getContractFactory("Hotel42Provider");
  const hotel42Provider = await Hotel42Provider.deploy();

  await hotel42Provider.deployed();
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

  await hotel42Provider.addRoomTypeByHotelId(
    'Luxury',
    1200,
    0,
  );

  console.log("Hote42Provider deployed to:", hotel42Provider.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
