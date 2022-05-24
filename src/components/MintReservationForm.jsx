import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Box,
  Button,
  Center
} from '@chakra-ui/react'
import {useContracts} from '../contexts';
import {constants} from 'ethers'

const fetchIPFS = (data) => fetch('/api/ipfs', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(res => res.json()).catch(err => alert(`IPFS request error: ${err.message}`))


const MintReservationForm = ({
  hotel,
  roomTypes,
}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [checkInDate, setCheckInDate] = React.useState('');
  const [checkOutDate, setCheckOutDate] = React.useState('');
  const [selectedRoomType, setSelectedRoomType] = React.useState('');

  const { hotel42NftContract, hotel42Provider, usdc } = useContracts();

  const confirmReservation = async () => {
    try {

      let inDate = new Date(checkInDate);
      inDate = inDate.toISOString();      //inorder to query on date values in IPFS the values must be ISO_8601 format

      let outDate = new Date(checkOutDate);
      outDate = outDate.toISOString();    

      
      const reservationInfo = {
        privateReservationInfo: {
          firstName,
          lastName,
          email,
        },
        publicReservationInfo: {
          ...hotel,
          checkInDate: inDate,
          checkOutDate: outDate,
          roomType: selectedRoomType,
          nftAddress: hotel42NftContract.address
        }
      };

      const { ipfs_hash } = await fetchIPFS(reservationInfo);


      const tx = await hotel42NftContract.confirmReservation(hotel42Provider.address, hotel.canonicalHotelId, selectedRoomType, inDate, outDate);

      await tx.wait();

      //call setTokenURI function to create mapping from tokenID to ipfs hash
      //const tx2 = await hotel42NftContract.settingTokenURI(ipfs_hash);

      //await tx2.wait();
      
      // TODO add a success dialog
      console.log('succesfully minted it!');
    } catch (e) {
      // TODO add a failure dialog
      console.log('error confirming reservation: ', e);
    }
  }

  return (
    <Center>
      <Box maxW="350px" mt="3rem">
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
          <FormLabel htmlFor='roomType'>Room type</FormLabel>
          <Select
            id='roomType'
            placeholder='Select room type'
            onChange={(e) => {
              setSelectedRoomType(e.target.value)
            }}
          >
            {roomTypes.map(roomType => (
              <option key={roomType.id} value={roomType.id}>{roomType.type} - ${roomType.price}</option>
            ))}
          </Select>
        </FormControl>

        {/* TODO: need to just approve the room price amount   */}
        {/* TODO: only require approve() if not already approved */}
        <Button colorScheme="teal" onClick={() => usdc.approve(hotel42NftContract.address, constants.MaxUint256).then(confirmReservation)}>
          Submit
        </Button>
      </Box>
    </Center>
  );
}

export default MintReservationForm;
