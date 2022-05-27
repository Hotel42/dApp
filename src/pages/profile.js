import React from "react";
import { VStack, Center, Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { useAccount, useContracts } from "../contexts";
import { ReservationCard } from "../components/ReservationCard";


const fetchMetadata = (uri) => fetch(uri, {
  method: 'GET',
}).then(res => res.json()).catch(err => {
  console.log(err); // swallow errors for now
})

export default function ProfilePage() {
  const accountContext = useAccount();
  const [reservations, setReservations] = React.useState([]);
  const { hotel42NftContract } = useContracts();

  const fetch = async () => {
    const tx = await hotel42NftContract.tokensOfOwner()
    const reservationIds = tx.map(reservationId => reservationId.toNumber()).filter(i => i); // zero is bad


    const reservationsUris = await Promise.all(reservationIds.map(rId => hotel42NftContract.tokenURI(rId)));

    // TODO: should group metadata with ids in an array of objects
    const reservationMetadataResults = await Promise.all(reservationsUris.map(url => fetchMetadata(url)));
    if (reservationIds.length !== reservationMetadataResults.length) throw new Error('id lenth and returned metadata array are mismatched!');
    const reservationMetadataWithId = reservationMetadataResults.map((metadata, idx) => ({
      ...metadata,
      tokenId: reservationIds[idx],
    }));
    console.log(reservationMetadataWithId)
    setReservations(reservationMetadataWithId);
  }

  React.useEffect(() => {
    if (hotel42NftContract && accountContext.address) {
      fetch();
    }
  }, [hotel42NftContract, accountContext.address]);

  return (
    <Box>
      <Heading>My Reservations</Heading>
      {reservations.map(reservationMetaData => (
        <ReservationCard
          key={reservationMetaData.tokenId}
          // passing this in so we can keep the same metadata structure
          // when we update IPFS
          metadata={reservationMetaData}
        />
      ))}
    </Box>
  );
}

