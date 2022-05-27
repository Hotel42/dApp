
const hre = require("hardhat");

async function onComplete(hotel42Provider) {
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

  await hotel42Provider.addHotel(
    'Mariton International',
    'New York',
    'NY',
    5,
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  );
  await hotel42Provider.addRoomTypeByHotelId(
    'King Deluxe',
    1500,
    1,
  );
  await hotel42Provider.addRoomTypeByHotelId(
    'Penthouse Suite',
    2000,
    1,
  );

  await hotel42Provider.addHotel(
    'The Dutch House',
    'San Diego',
    'CA',
    5,
    'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80',
  );
  await hotel42Provider.addRoomTypeByHotelId(
    'Ensuite King',
    1700,
    2,
  );
  await hotel42Provider.addRoomTypeByHotelId(
    'Single King',
    1500,
    2,
  );

  // await hotel42Provider.addHotel(
  //   'The French Riverra',
  //   'Baca Raton',
  //   'FL',
  //   4,
  //   'https://unsplash.com/photos/MXbM1NrRqtI',
  // );
  // await hotel42Provider.addRoomTypeByHotelId(
  //   'The King Express',
  //   3000,
  //   3,
  // );

  // await hotel42Provider.addHotel(
  //   "Hotel De L'empire",
  //   'Paris',
  //   'FR',
  //   5,
  //   'https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=898&q=80',
  // );
  // await hotel42Provider.addRoomTypeByHotelId(
  //   'Residential Suite',
  //   5000,
  //   5,
  // );
}

module.exports = { onComplete }

// async function main() {
//   const Hotel42Provider = await hre.ethers.getContractFactory("Hotel42Provider");
//   const hotel42Provider = await Hotel42Provider.deploy();

//   await hotel42Provider.deployed();
//   await hotel42Provider.addHotel(
//     'Hotel Shang-ri-la',
//     'Denver',
//     'CO',
//     4,
//     'https://images.unsplash.com/photo-1455587734955-081b22074882?ixlib=rb-1.2.1&raw_url=true&q=80&fm=jpg&crop=entropy&cs=tinysrgb&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470',
//   );

//   await hotel42Provider.addRoomTypeByHotelId(
//     'Deluxe',
//     950,
//     0,
//   );

//   await hotel42Provider.addRoomTypeByHotelId(
//     'Luxury',
//     1200,
//     0,
//   );

//   console.log("Hote42Provider deployed to:", hotel42Provider.address);
// }

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
// main()
//   .then(() => process.exit(0))
//   .catch((error) => {
//     console.error(error);
//     process.exit(1);
//   });
