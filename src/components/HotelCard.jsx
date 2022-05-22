import React from 'react';
import {Box, Image, Badge} from '@chakra-ui/react';
import { useRouter } from 'next/router'

export function HotelCard({
  id,
  hotelName,
  imageUrl,
  city,
  state,
  stars,
}) {
  const router = useRouter();
  const starArray = new Array(stars).fill('⭐️');
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
      onClick={() => router.push(`/book/${id}`)}
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
        <Box
          color='gray.500'
          fontWeight='semibold'
          letterSpacing='wide'
          fontSize='xs'
          ml={2}
          textTransform='uppercase'
        >
          {city}{state}
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
          {starArray.map(star => star)}
        </Box>
      </Box>
    </Box>
  )
}