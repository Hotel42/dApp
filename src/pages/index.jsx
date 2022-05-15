import React from "react";
import { Provider, NETWORKS } from '@web3-ui/core';
import {ConnectWallet} from "../components/ConnectWallet";

export default function Home() {
  return (
    <div>
      <Provider network={NETWORKS.rinkeby}>
        <ConnectWallet/>
      </Provider>
    </div>
);
}
