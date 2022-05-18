import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Box,
  Button,
} from '@chakra-ui/react'
import {useContracts} from '../contexts';


const MintReservationForm = () => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [hotelName, setHotelName] = React.useState('');
  const [checkInDate, setCheckInDate] = React.useState('');
  const [checkOutDate, setCheckOutDate] = React.useState('');
  const [roomType, setRoomType] = React.useState('');

  const { hotel42NftContract } = useContracts();

  return (
    <Box maxW="350px">
      <FormControl isRequired>
        <FormLabel htmlFor='first-name'>First name</FormLabel>
        <Input
         id='first-name'
         placeholder='First name'
         onChange={(e) => setFirstName(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='last-name'>Last name</FormLabel>
        <Input
          id='last-name'
          placeholder='Last name'
          onChange={(e) => setLastName(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='email'>Email</FormLabel>
        <Input
          id='email'
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='checkInDate'>Check in date</FormLabel>
        <Input
          id='checkInDate'
          type='date'
          placeholder='Check in date'
          onChange={(e) => setCheckInDate(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='checkOutDate'>Check out date</FormLabel>
        <Input
          id='checkOutDate'
          type='date'
          placeholder='Check out date'
          onChange={(e) => setCheckOutDate(e.target.value)}
        />
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='hotelName'>Hotel name</FormLabel>
        <Select
          id='hotelName'
          placeholder='Select hotel'
          onChange={(e) => setHotelName(e.target.value)}
        >
          <option>Marriot International, Denver, CO</option>
          <option>Holiday Inn, Denver, CO</option>
          <option>Landyard Internatioanl Hotel, NY</option>
        </Select>
      </FormControl>

      <FormControl isRequired>
        <FormLabel htmlFor='roomType'>Room type</FormLabel>
        <Select
          id='roomType'
          placeholder='Select room type'
          onChange={(e) => setRoomType(e.target.value)}
        >
          <option>Ensuite</option>
          <option>King</option>
          <option>Single</option>
        </Select>
      </FormControl>

      <Button colorScheme="teal" onClick={async () => {
          try {
            const tx = hotel42NftContract.confirmReservation(
              firstName,
              lastName,
              email,
              hotelName,
              checkInDate,
              checkOutDate,
              roomType,
            );
            await tx.wait();
            console.log('succesfully minted it!');
          } catch (e) {
            console.log('error confirming reservation: ', e);
          }
      }}>
        Submit
      </Button>
    </Box>
  );
}

export default MintReservationForm;
