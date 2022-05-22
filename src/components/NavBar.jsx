import React from 'react';
import { Center, Box, Heading, Flex, Text, Button } from "@chakra-ui/react";
import { Spacer } from '../components/Spacer';
import {ConnectWallet} from './ConnectWallet';
import {useRouter} from "next/router";

const NavBar = (props) => {
  const router = useRouter();

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
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"} onClick={() => router.push('/')}>
          Hotel42
        </Heading>
        <Spacer width="30px"/>
      </Flex>

      <Flex>
        <Box
          display={{ sm: "none", md: "block" }}
          mt={{ base: 4, md: 0 }}
        >
          <ConnectWallet/>
        </Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
