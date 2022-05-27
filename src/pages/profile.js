import React from "react";
import { Box, Heading, Flex, Button, Input, Badge } from "@chakra-ui/react";
import { useAccount, useContracts } from "../contexts";
import { ReservationCard } from "../components/ReservationCard";
import { Spacer } from "../components/Spacer";

const fetchMetadata = (uri) => fetch(uri, {
  method: 'GET',
}).then(res => res.json()).catch(err => {
  console.log(err); // swallow errors for now
})

const ManageReservation = ({ reservation }) => {
  const { tokenId } = reservation;
  const { hotel42NftContract, hotel42Marketplace } = useContracts();
  const [userDefinedPrice, setUserDefinedPrice] = React.useState(0);
  const [listPrice, setListPrice] = React.useState(0);

  const fetchMarketplaceData = async () => {
    const listing = await hotel42Marketplace.listingsByContract(hotel42NftContract.address, tokenId);
    setListPrice(listing.price.toNumber());
  }

  const setItemUpForSale = async (price) => {
    try {
      const res = await hotel42Marketplace.createMarketItem(hotel42NftContract.address, tokenId, price);
      await res.wait()
    } catch (e) {
      console.log('Error listing NFT up for sale: ', e);
    }
  }

  React.useEffect(() => {
    fetchMarketplaceData();
  }, []);

  if (listPrice) {
    return (
      <div>
        <Spacer height="4px" />
        <Badge colorScheme="purple">
          Listed for ${listPrice}
        </Badge>
      </div>
    )
  }

  return (<>
    <Spacer height="10px" />
    <Flex>
      <Input
        type='number'
        placeholder='$'
        onChange={(e) => setUserDefinedPrice(e.target.value)}
      />
      <Spacer width="10px" />
      <Button
        isDisabled={!userDefinedPrice}
        onClick={async (e) => {
          e.preventDefault();
          e.stopPropagation();
          if (userDefinedPrice === 0) {
            throw new Error('user defined price has not been set');
          }
          const tx = await hotel42NftContract.approve(hotel42Marketplace.address, tokenId)
          await tx.wait()
          await setItemUpForSale(userDefinedPrice);
          setListPrice(userDefinedPrice);
        }}
      >
        List
      </Button>
    </Flex>
  </>)
}

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
          ManageReservation={<ManageReservation reservation={reservationMetaData} />}
        />
      ))}
    </Box>
  );
}

