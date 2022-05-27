import React from 'react';
import {Box, Image} from '@chakra-ui/react';
import {Spacer} from "./Spacer";
import getTraitTypeValue from '../utils/getTraitTypeValue';

export function ReservationCard({
  metadata,
  ManageReservation,
}) {
  const hotelName = getTraitTypeValue('hotelName', metadata.attributes);
  const city = getTraitTypeValue('city', metadata.attributes);
  const state = getTraitTypeValue('state', metadata.attributes);
  const imageUrl = metadata.image;
  const checkInDateObj = new Date(getTraitTypeValue('checkInDate', metadata.attributes));
  const checkInDateStr = `${month[checkInDateObj.getMonth()]} ${checkInDateObj.getDate()}`;
  const checkOutDateObj = new Date(getTraitTypeValue('checkOutDate', metadata.attributes));
  const checkOutDateStr = `${month[checkOutDateObj.getMonth()]} ${checkOutDateObj.getDate()}`;

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
        <Box>
          {ManageReservation}
        </Box>
      </Box>
    </Box>
  )
}

const month = ["Jan", "Feb", "Mar", 'May', 'June', 'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];