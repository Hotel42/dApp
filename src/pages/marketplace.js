import React, { useState } from "react";
import { Heading, Box } from "@chakra-ui/react";
import { useAccount, useContracts } from "../contexts";
import { ReservationCard } from '../components/ReservationCard'

/*
  WIP
*/


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
  const { hotel42Marketplace, hotel42NftContract } = useContracts();
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

  return (
    <Box>
      <Heading>Marketplace</Heading>
      {
        marketListings.map(reservation => (<ReservationCard
          type="marketplace"
          key={reservation.listingId}
          metadata={reservation}
        />))
      }
    </Box>
  );
}
