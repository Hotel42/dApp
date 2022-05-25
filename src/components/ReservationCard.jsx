import React from 'react';
import {Flex, Input, Box, Image, Badge, Button} from '@chakra-ui/react';
import {useContracts} from "../contexts";

const fetchIPFS = (data) => fetch('/api/ipfs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(res => res.json()).catch(err => alert(`IPFS request error: ${err.message}`))

export function ReservationCard({
  metadata
}) {
  const { hotel42Marketplace, hotel42NftContract } = useContracts();
  const hotelName = getTraitTypeValue('hotelName', metadata.attributes);
  const city = getTraitTypeValue('city', metadata.attributes);
  const state = getTraitTypeValue('state', metadata.attributes);
  const tokenId = metadata.tokenId;
  const imageUrl = metadata.image;
  const checkInDate = getTraitTypeValue('checkInDate', metadata.attributes);
  const checkOutDate = getTraitTypeValue('checkOutDate', metadata.attributes);

  const [userDefinedPrice, setUserDefinedPrice] = React.useState(0);
  const [listPrice, setListPrice] = React.useState(0);

  const fetchMarketplaceData = async () => {
    const listing = await hotel42Marketplace.getMarketplaceListing(hotel42NftContract.address, tokenId);
    setListPrice(listing.price.toNumber());
  }

  const setItemUpForSale = async (price) => {
    try {
      const res = await hotel42Marketplace.createMarketItem(hotel42NftContract.address, tokenId, price);
    } catch (e) {
      console.log('Error listing NFT up for sale: ', e);
    }
  }

  React.useEffect(() => {
    fetchMarketplaceData();
  }, []);

  return (
    <Box
      maxW='300px'
      borderWidth='1px'
      borderRadius='xl'
      transitionDuration="250ms"
      overflow='hidden'
      boxShadow="xs"
      cursor="pointer"
      position="relative"
      _hover={{
        boxShadow: 'md',
      }}
    >
      <Box>
        <Image
          src={imageUrl}
        />
      </Box>

      <Box p='5'>
        <Box display='flex' alignItems='baseline'>
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            textTransform='uppercase'
          >
            {`${city}, ${state}`}
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {hotelName}
        </Box>

        <Box as='span' color='gray.600' fontSize='xs'>
          {checkInDate} -> {checkOutDate}
        </Box>
        <Box>
          {listPrice > 0 ? (
            <div>Listed for {listPrice}</div>
          ) : (
            <Flex>
              <Input
                type='number'
                placeholder='$'
                onChange={(e) => setUserDefinedPrice(e.target.value)}
              />
              <Button
                isDisabled={!userDefinedPrice}
                onClick={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (userDefinedPrice === 0) {
                    throw new Error('user defined price has not been set');
                  }
                  setItemUpForSale(userDefinedPrice);
                }}
              >
                List
              </Button>
            </Flex>
          )}
        </Box>
      </Box>
    </Box>
  )
}

const getTraitTypeValue = (traitType, attributesJson) => {
   const val = attributesJson.find(attribute => {
    return attribute.trait_type === traitType;
  });
  if (!val) {
    console.log('trait not found: ', traitType);
  }
  return val.value;
}
