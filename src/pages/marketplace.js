import React from "react";
import {useAccount, useContracts} from "../contexts";

export default function MarketplacePage() {
  const accountContext = useAccount();
  const { hotel42Provider } = useContracts();

  const fetch = async () => {
    const tx = await hotel42Provider.getAllHotels();
    console.log(tx);
    // fetch from IPFS based on reservationIds;
  }

  React.useEffect(() => {
    if (hotel42Provider && accountContext.address) {
      fetch();
    }
    console.log('not ran', hotel42Provider)
  }, [hotel42Provider, accountContext.address]);
  return (
    <div>Marketplace</div>
  );
}
