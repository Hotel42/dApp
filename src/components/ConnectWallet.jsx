import React from "react";
import { Tooltip, Center, Text, Button, Flex, Avatar } from '@chakra-ui/react'
import { Spacer } from "./Spacer";
import { useAccount } from "../contexts";
import { connectWallet } from "../utils/common";
import { useRouter } from 'next/router'


export const ConnectWallet = () => {
  const router = useRouter();
  const accountContext = useAccount();
  const walletButton = React.useMemo(() => {
    return accountContext.address
      ? <ConnectedProfile addr={accountContext.address}/>
      : <ConnectWalletButton/>;

  }, [accountContext.address]);
  return (
    <Button
      bg="transparent"
      color="#dba102"
      border="1px"
      onClick={accountContext.address
        ? () => router.push('/profile')
        : connectWallet}
    >
      {walletButton}
    </Button>
  );
}

const ConnectWalletButton = () => {
  return (
    <Tooltip label="Click to sign in with Metamask wallet">
      <Flex>
        <Text size="lg">💰</Text>
        <Spacer width='10px'/>
        <Text>Connect wallet</Text>
      </Flex>
    </Tooltip>
  );
}

const ConnectedProfile = ({ addr }) => {
  return (
    <Tooltip label="Go to your profile">
      <Flex>
        <Center>
          {trimWalletAddress(addr)}
          <Spacer width='10px'/>
          <Avatar size="xs" name='someone' src='https://bit.ly/prosper-baba'/>
        </Center>
      </Flex>
    </Tooltip>
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
