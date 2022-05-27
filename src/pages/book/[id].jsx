import React from 'react';
import { useRouter } from 'next/router'
import {VStack, Center, Box, Heading, Flex, Text, Button, Image} from "@chakra-ui/react";
import {useAccount, useContracts} from "../../contexts";
import MintReservationForm from "../../components/MintReservationForm";
import {PageContainer} from "../../components/PageContainer";
import {Spacer} from "../../components/Spacer";


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
    }
  }

  React.useEffect(() => {
    if (hotel42Provider && accountContext.address) {
      fetch(hotel42Provider);
    }
  }, [hotel42Provider, accountContext.address]);

  return (
    <PageContainer>
      {hotel ? (
        <>
          <Heading>{hotel.hotelName}</Heading>
          <Spacer height="20px"/>
          <Box>
            <Image
              borderRadius="10px"
              src={hotel.imageUrl}
            />
          </Box>
          <Spacer height="20px"/>
          <Flex>
            <Heading size="md">
              <Flex>
                📌<Spacer width="10px"/>{hotel.city}, {hotel.state}
              </Flex>
            </Heading>

            <Spacer width="30px"/>

            <Heading size="md">
              <Flex>
                ⭐️<Spacer width="5px"/>/<Spacer width="5px"/>{hotel.stars}
              </Flex>
            </Heading>
          </Flex>
          {hotel && roomTypes && (
            <Flex>
              <Box maxWidth="420px">
                <Spacer height="50px"/>
                <Text color="#474c55">
                  <span style={{
                    'fontWeight': '550'
                  }}>{hotel.hotelName}</span> is a seaside village next to Pemuteran close to Menjangan Island, diving and snorkeling paradise. It has diverse scenery and authentic culture steeped in tradition. Here you can truly relax away from the bustle of the south. The resort has panoramic views of the hills, the bay of Sumberkima and the volcanoes of Java. We have two restaurants at the retreat, serving local and international cuisines. Our reception team can organise all your excursions, yoga sessions and spa treatments.
                </Text>
              </Box>
              <Spacer width="100px"/>
              <MintReservationForm hotel={hotel} roomTypes={roomTypes}/>
            </Flex>
          )}
          <Spacer height="200px"/>
        </>
        ) : (
          <div>
            loading
          </div>
        )}
    </PageContainer>
  );
}