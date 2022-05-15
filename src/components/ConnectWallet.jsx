import React from "react";
import { useWallet } from '@web3-ui/core';
import { Button } from '@chakra-ui/react'

export const ConnectWallet = () => {
  const { connectWallet, connection, connected, disconnectWallet } = useWallet();
  console.log('connected: ', connected)
  return (
    <Button>
      {connected
        ? connection.ens || connection.userAddress
        : 'Connect wallet'}
    </Button>
  );
}