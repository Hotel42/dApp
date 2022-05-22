import React from "react";
import { Button } from '@chakra-ui/react'
import { useAccount } from "../contexts";
import { connectWallet } from "../utils/common";

export const ConnectWallet = () => {
  const accountContext = useAccount();
  return (
    <Button
      bg="transparent"
      color="#dba102"
      border="1px"
      onClick={accountContext.address ? null : connectWallet}
    >
      {accountContext.address ? trimWalletAddress(accountContext.address) : 'Connect wallet'}
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
