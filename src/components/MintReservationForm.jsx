import React from 'react';
import {
  FormControl,
  FormLabel,
  Select,
  Input,
  Box,
  Button,
  Center, Flex, Heading, Text
} from '@chakra-ui/react'
import {useContracts} from '../contexts';
import {constants} from 'ethers'
import {Spacer} from "./Spacer";

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

  const  generateNewIpfsAndUpdateTokenUri = async (reservationInfo, tokenId) => {
    let { ipfs_hash } = await fetchIPFS(reservationInfo);
  
    const tx2 = await hotel42NftContract.settingTokenURI(ipfs_hash, tokenId);
    await tx2.wait();
  }
  
  const confirmReservation = async () => {
    try {

      let inDate = new Date(checkInDate);
      inDate = inDate.toISOString();      //inorder to query on date values in IPFS the values must be ISO_8601 format

      let outDate = new Date(checkOutDate);
      outDate = outDate.toISOString();    

      let tokenId;

      const tx = await hotel42NftContract.confirmReservation(hotel42Provider.address, hotel.canonicalHotelId, selectedRoomType, inDate, outDate, hotel.city, hotel.state, hotel.hotelName, hotel.stars, hotel.imageUrl);
      const result = await tx.wait();

      for(let i in result.events){
        if(result.events[i].event == "ReservationMinted"){
          tokenId = result.events[i].args[0].toNumber();
          break;
        }
      }

      const reservationInfo = {
          privateReservationInfo: {
            firstName,
            lastName,
            email,
          },
          token_id: tokenId
      };

      await generateNewIpfsAndUpdateTokenUri(reservationInfo, tokenId);

      
      // TODO add a success dialog
      console.log('succesfully minted it!');
    } catch (e) {
      // TODO add a failure dialog
      console.log('error confirming reservation: ', e);
    }
  }

  return (
    <div>
      <Box maxW="375px" mt="3rem">

        {/* Inputting your name */}
        <Heading size="sm" fontWeight="600">
          <Flex>
            🙋<Spacer width="10px"/>‍️Your name
          </Flex>
        </Heading>
        <Spacer height="10px"/>
        <Flex>
          <Input
            id='first-name'
            placeholder='First name'
            onChange={(e) => setFirstName(e.target.value)}
          />
          <Spacer width="15px"/>
          <Input
            id='last-name'
            placeholder='Last name'
            onChange={(e) => setLastName(e.target.value)}
          />
        </Flex>

        <Spacer height="15px"/>

        {/* Inputting your email */}
        <Heading size="sm" fontWeight="600">
          <Flex>
            ✉️<Spacer width="10px"/>‍️Email
          </Flex>
        </Heading>
        <Spacer height="10px"/>
        <Input
          id='email'
          type='email'
          placeholder='Email'
          onChange={(e) => setEmail(e.target.value)}
        />

        <Spacer height="15px"/>

        {/* Inputting your check in date */}
        <Heading size="sm" fontWeight="600">
          <Flex>
            🗓<Spacer width="10px"/>‍️Check in date
          </Flex>
        </Heading>
        <Spacer height="10px"/>
        <Input
          id='checkInDate'
          type='date'
          placeholder='Check in date'
          onChange={(e) => setCheckInDate(e.target.value)}
        />

        <Spacer height="15px"/>

        {/* Inputting your check in date */}
        <Heading size="sm" fontWeight="600">
          <Flex>
            🗓<Spacer width="10px"/>‍️Check out date
          </Flex>
        </Heading>
        <Spacer height="10px"/>
        <Input
          id='checkOutDate'
          type='date'
          placeholder='Check out date'
          onChange={(e) => setCheckOutDate(e.target.value)}
        />

        <Spacer height="15px"/>

        {/* Inputting your check in date */}
        <Heading size="sm" fontWeight="600">
          <Flex>
            🛌<Spacer width="10px"/>Room type
          </Flex>
        </Heading>
        <Spacer height="10px"/>
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

        <Spacer height="20px"/>

        {/* TODO: need to just approve the room price amount   */}
        {/* TODO: only require approve() if not already approved */}
        <Button colorScheme="teal" onClick={() => usdc.approve(hotel42NftContract.address, constants.MaxUint256).then(confirmReservation)}>
          Submit
        </Button>
        <Spacer height="200px"/>
      </Box>
    </div>
  );
}

export default MintReservationForm;
