import React from 'react';
import { Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import {ConnectWallet} from './ConnectWallet';

const MenuItems = ({ children }) => (
  <Button
    bg="transparent"
    colorScheme="teal"
    outline="none"
    _hover={{ bg: 'transparent' }}
  >
    <Text mt={{ base: 4, md: 0 }} display="block">
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
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Hotel42
        </Heading>
      </Flex>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems>Book</MenuItems>
        <MenuItems>Marketplace</MenuItems>
        <MenuItems>My Trips</MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {/* <ConnectWallet/> */}
      </Box>
    </Flex>
  );
};

export default NavBar;
