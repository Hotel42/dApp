import React from "react";
import { VStack, Center, Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { useAccount, useContracts } from "../contexts";

export default function ProfilePage() {
  const accountContext = useAccount();
  const [reservations, setReservations] = React.useState([]);
  const { hotel42NftContract } = useContracts();

  const fetch = async () => {
    const tx = await hotel42NftContract.getReservationsByOwner()
    const reservationIds = tx.map(reservationId => reservationId.toNumber());
    setReservations(reservationIds);
    console.log(reservationIds);
    // TODO (aaftab): fetch from IPFS based on reservationIds;
  }

  React.useEffect(() => {
    if (hotel42NftContract && accountContext.address) {
      fetch();
    }
  }, [hotel42NftContract, accountContext.address]);

  return (
    <Box>
      <Heading>My Reservations</Heading>
      <div>The below are NFT ids for the reservation belonging to this user</div>
      {reservations.map(id => <div>{id}</div>)}
    </Box>
  );
}