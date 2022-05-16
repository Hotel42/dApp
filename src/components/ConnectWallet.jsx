import React from "react";
import { useWallet } from '@web3-ui/core';
import { Button } from '@chakra-ui/react'

export const ConnectWallet = () => {
  const { connectWallet, connection, connected, disconnectWallet } = useWallet();
  return (
    <Button
      bg="transparent"
      border="1px"
      colorScheme="teal"
      onClick={connected ? disconnectWallet : connectWallet}
    >
      {connected
        ? connection.ens || trimWalletAddress(connection.userAddress)
        : 'Connect wallet'}
    </Button>
  );
}

const trimWalletAddress = (walletAddress) => {
  if (!walletAddress) {
    return null;
  }
  const prefix = walletAddress.slice(0, 6);
  const suffix = walletAddress.slice(walletAddress.length - 4);
  return prefix + '...' + suffix;
}
