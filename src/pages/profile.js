import React from "react";
import { VStack, Center, Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { useAccount, useContracts } from "../contexts";


const fetchMetadata = (uri) => fetch(uri, {
  method: 'GET',
}).then(res => res.json()).catch(err => {
  console.log(err); // swallow errors for now
})

export default function ProfilePage() {
  const accountContext = useAccount();
  const [reservations, setReservations] = React.useState([]);
  const [reservationsMetadata, setReservationsMetadata] = React.useState([]);
  const { hotel42NftContract } = useContracts();

  const fetch = async () => {
    const tx = await hotel42NftContract.getReservationsByOwner()
    const reservationIds = tx.map(reservationId => reservationId.toNumber());


    const reservationsUris = await Promise.all(reservationIds.map(rId => hotel42NftContract.tokenURI(rId)));

    // TODO: should group metadata with ids in an array of objects
    const reservationMetadataResults = await Promise.all(reservationsUris.map(url => fetchMetadata(url)));
    const shouldntNeedToFilterOnceAllSetUriConfirmedToWork = reservationMetadataResults.filter(m => m);

    setReservations(reservationIds);
    setReservationsMetadata(shouldntNeedToFilterOnceAllSetUriConfirmedToWork);
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
      {reservationsMetadata.map(json => <code>{JSON.stringify(json)}</code>)}
    </Box>
  );
}