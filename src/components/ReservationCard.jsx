import React from 'react';
import {Flex, Input, Box, Image, Badge, Button} from '@chakra-ui/react';
import {useContracts} from "../contexts";
import {constants} from 'ethers'

export function ReservationCard({
  metadata,
  itemId,
  // the type can be of value 'profile' or 'marketplace'
  // type 'profile' has the ability to list an NFT for sale with an input box.
  // type 'marketplace' only has the ability see an NFT for sale price and purchase it.
  type,
}) {
  const { hotel42Marketplace, hotel42NftContract, usdc } = useContracts();
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
    const listing = await hotel42Marketplace.listingsByContract(hotel42NftContract.address, tokenId);
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
        {/* TODO: need to move some of the below logic to the parent, so this can handle the marketplace buy case as well */}
        <Box>
          {listPrice > 0 ? (
            <div>
              {type === 'marketplace' ? (
                <Button onClick={async () => {
                  await usdc.approve(hotel42Marketplace.address, constants.MaxUint256);
                  await hotel42Marketplace.purchaseMarketItem(itemId);
                }}>Purchase for {listPrice}</Button>
              ) : (
                <div>Listed for ${listPrice}</div>
              )}
            </div>
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
                  const tx = await hotel42NftContract.approve(hotel42Marketplace.address, tokenId)
                  await tx.wait()
                  setItemUpForSale(userDefinedPrice);
                  setListPrice(userDefinedPrice);
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

const getTraitTypeValue = (traitType, attributesJson = []) => {
   const val = attributesJson.find(attribute => {
    return attribute.trait_type === traitType;
  });
  if (!val) {
    console.log('trait not found: ', traitType);
  }
  return val?.value;
}
