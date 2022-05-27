import React, { useState } from "react";
import { Heading, Box, Button } from "@chakra-ui/react";
import { useContracts } from "../contexts";
import { ReservationCard } from '../components/ReservationCard'
import { constants } from 'ethers'
import { Spacer } from "../components/Spacer";
import {PageContainer} from "../components/PageContainer";


const fetchMetadata = (uri) => fetch(uri, {
  method: 'GET',
}).then(res => {
  console.log('res', res)
  return res.json()
}).catch(err => {
  console.log(uri)
  console.log(err); // swallow errors for now
})


export default function MarketplacePage() {
  const { hotel42Marketplace, hotel42NftContract, usdc } = useContracts();
  const [marketListings, setMarketListings] = useState([])

  const fetch = async () => {
    const marketItemIds = await hotel42Marketplace.getAllMarketItemIds().then(bigNums => bigNums.map(n => n.toNumber()));
    const marketRefs = await Promise.all(marketItemIds.map(id => hotel42Marketplace.marketItemReference(id)
      .then(({ nftContract, tokenId }) => ({
        nftContract, tokenId, id
      }))))

    const completeMarketListings = await Promise.all(marketRefs.map(({ nftContract, tokenId, id }) =>
      hotel42Marketplace.listingsByContract(nftContract, tokenId).then(({ seller, price }) => ({
        tokenId: tokenId.toNumber(),
        nftContract,
        listingId: id,
        seller,
        price: price.toString()
      }))))

    const marketListingsWithMetadata = await Promise.all(completeMarketListings.map(listing =>
      hotel42NftContract.tokenURI(listing.tokenId)
        .then(url => fetchMetadata(url)
          .then(metadata => ({
            ...metadata,
            ...listing
          })
          )
        )
    ))

    console.log({ marketListingsWithMetadata })

    setMarketListings(marketListingsWithMetadata);

  }

  React.useEffect(() => {
    if (hotel42Marketplace && hotel42NftContract) {
      fetch();
    }
  }, [hotel42Marketplace, hotel42NftContract]);

  const ManageReservation = ({ reservation }) => (
    <div>
      <Spacer height="12px" />
      <Button
        onClick={async () => {
          const approval = await usdc.approve(hotel42Marketplace.address, constants.MaxUint256);
          await approval.wait();
          const purchase = await hotel42Marketplace.purchaseMarketItem(reservation.listingId);
          await purchase.wait();
          console.log('purchase finished, navigate to profile page -> update reservation details')
        }}
        colorScheme="yellow"
      >Purchase for ${reservation.price.toString()}</Button>
    </div>
  )

  return (
    <PageContainer>
      <Heading>Marketplace</Heading>
      <Spacer height="20px"/>
      {
        marketListings.map(reservation => (<ReservationCard
          type="marketplace"
          key={reservation.listingId}
          metadata={reservation}
          ManageReservation={<ManageReservation reservation={reservation} />}
        />))
      }
    </PageContainer>
  );
}
