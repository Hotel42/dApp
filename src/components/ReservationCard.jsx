import React from 'react';
import {Box, Image, Badge} from '@chakra-ui/react';

function ReservationCard({
  propertyName,
  imageUrl,
  startDate,
  endDate,
  location,
  isListed,
}) {
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
      onClick={() => console.log('hello')}
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
          {isListed && <Badge
            borderRadius='full'
            px='2'
            colorScheme='purple'
          >
            LISTED
          </Badge>}
          <Box
            color='gray.500'
            fontWeight='semibold'
            letterSpacing='wide'
            fontSize='xs'
            ml={2}
            textTransform='uppercase'
          >
            {location}
          </Box>
        </Box>

        <Box
          mt='1'
          fontWeight='semibold'
          as='h4'
          lineHeight='tight'
          noOfLines={1}
        >
          {propertyName}
        </Box>

        <Box as='span' color='gray.600' fontSize='xs'>
          {startDate} -> {endDate}
        </Box>
      </Box>
    </Box>
  )
}
export default ReservationCard;