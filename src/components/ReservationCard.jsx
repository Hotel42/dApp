import React from 'react';
import {Flex, Input, Box, Image, Badge, Button, Text} from '@chakra-ui/react';
import {useContracts} from "../contexts";
import {constants} from 'ethers'
import {Spacer} from "./Spacer";

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
  const checkInDateObj = new Date(getTraitTypeValue('checkInDate', metadata.attributes));
  const checkInDateStr = `${month[checkInDateObj.getMonth()]} ${checkInDateObj.getDate()}`;
  const checkOutDateObj = new Date(getTraitTypeValue('checkOutDate', metadata.attributes));
  const checkOutDateStr = `${month[checkOutDateObj.getMonth()]} ${checkOutDateObj.getDate()}`;

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

        <Spacer height="2px"/>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {hotelName}
        </Box>

        <Spacer height="2px"/>

        <Box as='span' color='gray.600' fontSize='sm'>
          {checkInDateStr} &#8594; {checkOutDateStr}
        </Box>
        {/* TODO: need to move some of the below logic to the parent, so this can handle the marketplace buy case as well */}
        <Box>
          {listPrice > 0 ? (
            <div>
              {type === 'marketplace' ? (
                <div>
                  <Spacer height="12px"/>
                  <Button
                    onClick={async () => {
                      const approval = await usdc.approve(hotel42Marketplace.address, constants.MaxUint256);
                      await approval.wait();
                      const purchase = await hotel42Marketplace.purchaseMarketItem(itemId);
                      await purchase.wait();
                      console.log('purchase finished, navigate to profile page -> update reservation details')
                    }}
                    colorScheme="yellow"
                  >Purchase for ${listPrice}</Button>
                </div>
              ) : (
                <div>
                  <Spacer height="4px"/>
                  <Badge colorScheme="purple">
                    Listed for ${listPrice}
                  </Badge>
                </div>
              )}
            </div>
          ) : (
            <>
              <Spacer height="10px"/>
              <Flex>
                <Input
                  type='number'
                  placeholder='$'
                  onChange={(e) => setUserDefinedPrice(e.target.value)}
                />
                <Spacer width="10px"/>
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
            </>
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

const month = ["Jan", "Feb", "Mar", 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];