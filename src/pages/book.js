import React from "react";
import { VStack, Center, Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import {useAccount, useContracts} from "../contexts";
import { HotelCard } from "../components/HotelCard";

export default function BookingPage() {
  const [hotels, setHotels] = React.useState([]);
  const accountContext = useAccount();
  const { hotel42Provider } = useContracts();

  const fetch = async () => {
    const tx = await hotel42Provider.getAllHotels();
    const hotels = tx.map(hotel => {
      return {
        hotelName: hotel[0],
        city: hotel[1],
        state: hotel[2],
        stars: hotel[3].toNumber(),
        imageUrl: hotel[4],
        id: hotel[5].toNumber(),
      }
    });
    setHotels(hotels);
    console.log(hotels);
  }

  React.useEffect(() => {
    if (hotel42Provider && accountContext.address) {
      fetch();
    }
  }, [hotel42Provider, accountContext.address]);
  return (
    <div>
      <Heading>Book a hotel</Heading>
      {hotels.map(hotel => (
        <HotelCard
          id={hotel.id}
          hotelName={hotel.hotelName}
          city={hotel.city}
          state={hotel.state}
          stars={hotel.stars}
          imageUrl={hotel.imageUrl}
        />
      ))}
    </div>
  );
}