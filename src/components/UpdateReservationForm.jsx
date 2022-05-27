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


const UpdateReservationForm = ({
  hotel,
  roomTypes,
}) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');

  const { hotel42NftContract, hotel42Provider, usdc } = useContracts();

  const  generateNewIpfsAndUpdateTokenUri = async (reservationInfo, tokenId) => {
    let { ipfs_hash } = await fetchIPFS(reservationInfo);
  
    const tx = await hotel42NftContract.settingTokenURI(ipfs_hash, tokenId);
    await tx.wait();
  }
  

  const updateReservation = async () => {
    try {

      const old_ipfs_hash = hotel42NftContract._tokenURIs(tokenId);   //this mapping variable is not visible but is created by openzepplin _setTokenURI function

      const reservationInfo = {
        privateReservationInfo: {
          firstName,
          lastName,
          email
        },
        token_id: tokenId,
        old_hash: old_ipfs_hash
    };

    generateNewIpfsAndUpdateTokenUri(reservationInfo, tokenId);

    console.log('succesfully updated reservation!');

    } catch (e) {

      console.log('error updating reservation: ', e);
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
        <Button colorScheme="teal" onClick={() => updateReservation}>
          Update
        </Button>
      </Box>
    </Center>
  );
}

export default UpdateReservationForm;
