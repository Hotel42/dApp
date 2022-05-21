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

// TODO: might not work yet
const fetchIPFS = () => fetch('/api/ipfs').then(res => res.json())


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

            let inDate = new Date(checkInDate);
            inDate = inDate.toISOString();      //inorder to query on date values in IPFS the values must be ISO_8601 format

            let outDate = new Date(checkOutDate);
            outDate = outDate.toISOString();    

            const NFT_metadata = {      //nft metadata in json format inorder to write to IPFS
              firstName: firstName,
              lastName: lastName,
              email: email,
              hotelName: hotelName,
              checkInDate: inDate,
              checkOutDate: outDate,
              roomType: roomType,
              image: 'https://gateway.pinata.cloud/ipfs/QmVXTa57AAeEzLpxLfV2RGcPGa46UxxaRNy1KQcH71btfM',  //using generic image for all NFTs so hardcoded its location on IPFS
              isSale: 'false'   //parameter used to make sure only NFTs that are on sale can be seen on marketplace
            };

            const pinata_metadata = {           //everytime we write to IPFS we need to include Pinata metadata so we can query the data later 
                pinataMetadata: {
                    keyvalues: NFT_metadata
                }
            };

            const ipfs_hash = await fetchIPFS()
            

            const tx = hotel42NftContract.confirmReservation(
              firstName,
              lastName,
              email,
              hotelName,
              checkInDate,
              checkOutDate,
              roomType,
              ipfs_hash
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
