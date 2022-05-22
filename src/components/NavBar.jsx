import React from 'react';
import { Center, Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { Spacer } from '../components/Spacer';
import {ConnectWallet} from './ConnectWallet';

const MenuItems = ({ children }) => (
  <Button
    bg="transparent"
    color="#dba102"
    outline="none"
    _hover={{ bg: 'transparent' }}
  >
    <Text mt={{ base: 2, md: 0 }} display="block">
      {children}
    </Text>
  </Button>
);

const NavBar = (props) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="transparent"
      color="#dba102"
      {...props}
    >

      <Flex>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Hotel42
        </Heading>
        <Spacer width="30px"/>
        {/* <MenuItems>
          Home
        </MenuItems>
        <Center>
          <MenuItems>
            Marketplace
          </MenuItems>
        </Center> */}
      </Flex>

      <Flex>
        <Box
          display={{ sm: show ? "block" : "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <ConnectWallet/>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
