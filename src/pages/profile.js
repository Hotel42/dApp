import React from "react";
import { Box, Heading, Flex, Button, Input, Badge, useDisclosure } from "@chakra-ui/react";
import { useAccount, useContracts } from "../contexts";
import { ReservationCard } from "../components/ReservationCard";
import { Spacer } from "../components/Spacer";
import getTraitTypeValue from "../utils/getTraitTypeValue";
import UpdateReservationForm from "../components/UpdateReservationForm";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast,
} from '@chakra-ui/react'
import {PageContainer} from "../components/PageContainer";
import {useHover} from "../utils/useHover";


const fetchMetadata = (uri) => fetch(uri, {
  method: 'GET',
}).then(res => res.json()).catch(err => {
  console.log(err); // swallow errors for now
})

const ManageReservation = ({ reservation }) => {
  const {
    isOpen: isUpdateBookingOpen,
    onOpen: onUpdateBookingOpen,
    onClose: onUpdateBookingClose,
  } = useDisclosure()

  const {
    isOpen: isListPriceOpen,
    onOpen: onListPriceOpen,
    onClose: onListPriceClose,
  } = useDisclosure()

  const toast = useToast();
  const [hoverRef, isHovered] = useHover();

  const { tokenId, attributes } = reservation;
  const { hotel42NftContract, hotel42Marketplace } = useContracts();
  const [userDefinedPrice, setUserDefinedPrice] = React.useState(0);
  const [listPrice, setListPrice] = React.useState(0);
  const [listingId, setListingId] = React.useState(null);

  const privateBookingInfoUri = getTraitTypeValue("privateBookingInfoUri", attributes);

  const fetchMarketplaceData = async () => {
    const [marketplaceListingId, listing] = await Promise.all([
      hotel42Marketplace.getMarketIdForNFT(hotel42NftContract.address, tokenId),
      hotel42Marketplace.listingsByContract(hotel42NftContract.address, tokenId)
    ]);
    setListingId(marketplaceListingId.toNumber())
    setListPrice(listing.price.toNumber());
  }

  const setItemUpForSale = async (price) => {
    try {
      const res = await hotel42Marketplace.createMarketItem(hotel42NftContract.address, tokenId, price);
      const receipt = await res.wait();
      setListingId(receipt.events[0].args.marketListingId.toNumber())
      setListPrice(userDefinedPrice);
    } catch (e) {
      console.log('Error listing NFT up for sale: ', e);
    }
  }

  const deleteMarketListing = async () => {
    try {
      const res = await hotel42Marketplace.deleteMarketListing(listingId);
      await res.wait();
      console.log('done! should refresh data...')
      toast({
        title: 'Reservation deleted',
        description: 'Your reservation should only be seen by you from now on',
        status: 'success',
        duration: '3000',
        isClosable: true,
      });
      setListPrice(0)
    } catch (e) {
      console.log('Error listing NFT up for sale: ', e);
    }
  }

  React.useEffect(() => {
    fetchMarketplaceData();
  }, []);


  React.useEffect(() => {
    console.log("useEffect", privateBookingInfoUri)
    if (privateBookingInfoUri) {
      fetchMetadata(privateBookingInfoUri).then(data => {
        console.log('private data', data)
      });
    }
  }, [privateBookingInfoUri]);

  if (listPrice) {
    return (
      <Box>
        <div>
          <Spacer height="4px" />
          <Badge colorScheme="purple">
            Listed for ${listPrice}
          </Badge>
        </div>
        <Spacer height="12px" />
        <Button colorScheme="yellow" onClick={deleteMarketListing}>Delete Listing</Button>
      </Box>
    )
  }

  return (<>

    <Spacer height="10px" />
    <Flex>
      <Button
        colorScheme="yellow"
        onClick={() => {
          onListPriceOpen();
        }}
      >
        List
      </Button>
      <Spacer width="10px" />
      <Button
        onClick={onUpdateBookingOpen}
        colorScheme="yellow"
      >
        Update Booking
      </Button>
    </Flex>

    <Modal isOpen={isUpdateBookingOpen} onClose={onUpdateBookingClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Booking Info</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <UpdateReservationForm tokenId={tokenId} />
        </ModalBody>
      </ModalContent>
    </Modal>

    <Modal isOpen={isListPriceOpen} onClose={onListPriceClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>List your reservation resale price</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Input
            type='number'
            placeholder='$'
            onChange={(e) => setUserDefinedPrice(e.target.value)}
          />
          <Spacer height="20px"/>
          <Button colorScheme="yellow" onClick={async (e) => {
            try {
              e.preventDefault();
              e.stopPropagation();
              if (userDefinedPrice === 0) {
                throw new Error('user defined price has not been set');
              }
              const tx = await hotel42NftContract.approve(hotel42Marketplace.address, tokenId)
              await tx.wait()
              await setItemUpForSale(userDefinedPrice);
              toast({
                title: `Reservation listed for $${userDefinedPrice}`,
                description: 'Your reservation will be available in the marketplace',
                status: 'success',
                duration: '3000',
                isClosable: true,
              });
            } catch (e) {
              toast({
                title: 'Reservation listing failed',
                description: e,
                status: 'error',
                duration: '3000',
                isClosable: true,
              });
            }
          }}>Submit</Button>
          <Spacer height="20px"/>
        </ModalBody>
      </ModalContent>
    </Modal>
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
    <PageContainer>
      <Box>
        <Heading>My Reservations</Heading>
        <Spacer height="20px"/>
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
    </PageContainer>
  );
}

