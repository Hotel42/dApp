import React from 'react';
import { useRouter } from 'next/router'
import { VStack, Center, Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import {useAccount, useContracts} from "../../contexts";
import MintReservationForm from "../../components/MintReservationForm";


export default function BookWithHotelPage() {
  const [roomTypes, setRoomTypes] = React.useState([]);
  const [hotel, setHotel] = React.useState();
  const router = useRouter();
  const accountContext = useAccount();
  const { hotel42Provider } = useContracts();

  const fetch = async () => {
    if (router.query.id) {
      const tx = await hotel42Provider.getRoomTypesByHotelId(router.query.id);
      const roomTypes = tx.map(roomType => ({
        type: roomType[0],
        price: roomType[1].toNumber(),
        id: roomType[2].toNumber()
      }));
      setRoomTypes(roomTypes);

      const tx2 = await hotel42Provider.getHotelById(router.query.id);
      const hotel = {
          hotelName: tx2[0],
          city: tx2[1],
          state: tx2[2],
          stars: tx2[3].toNumber(),
          imageUrl: tx2[4],
          canonicalHotelId: tx2[5].toNumber(),
          canonicalHotelAddress: hotel42Provider.address
      }
      setHotel(hotel);
      console.log(hotel)
    }
  }

  React.useEffect(() => {
    if (hotel42Provider && accountContext.address) {
      fetch(hotel42Provider);
    }
  }, [hotel42Provider, accountContext.address]);

  return (
    <div>
      <Heading>Book</Heading>
      {hotel && roomTypes && (
        <MintReservationForm hotel={hotel} roomTypes={roomTypes}/>
      )}
    </div>
  );
}