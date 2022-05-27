import React from 'react';
import {
  FormControl,
  FormLabel,
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


const UpdateReservationForm = ({tokenId}) => {
  const [firstName, setFirstName] = React.useState();
  const [lastName, setLastName] = React.useState();
  const [email, setEmail] = React.useState();

  const { hotel42NftContract } = useContracts();

  const  generateNewIpfsAndUpdateTokenUri = async (reservationInfo) => {
    let {ipfs_hash} = await fetchIPFS(reservationInfo);
    const tx = await hotel42NftContract.settingTokenURI(ipfs_hash, tokenId);
    await tx.wait();
  }
  

  const updateReservation = async () => {
    console.log('updateReservation', tokenId)
    try {

      const old_ipfs_hash = hotel42NftContract.tokenURI(tokenId);

      const reservationInfo = {
        privateReservationInfo: {
          firstName,
          lastName,
          email
        },
        token_id: tokenId,
        old_hash: old_ipfs_hash
    };

    await generateNewIpfsAndUpdateTokenUri(reservationInfo);

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
        <Button mt="1rem" colorScheme="teal" onClick={updateReservation}>
          Update
        </Button>
      </Box>
    </Center>
  );
}

export default UpdateReservationForm;
