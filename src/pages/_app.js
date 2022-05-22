import {ChakraProvider} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import "focus-visible/dist/focus-visible"
import React from "react";
import {AccountContext, ContractsContext} from '../contexts';
import addresses from '../addresses.json';
import Hotel42NFT from '../../artifacts/contracts/Hotel42NFT.sol/Hotel42NFT.json';
import Hotel42Provider from "../../artifacts/contracts/Hotel42Provider.sol/Hotel42Provider.json";
import {getCurrentAccount, getEthereumObject, getSignedContract, setupEthereumEventListeners} from '../utils/common';

function App({ Component }) {
  const [account, setAccount] = React.useState(null);
  const [contracts, setContracts] = React.useState({
    hotel42NftContract: null,
    hotel42Provider: null,
  });

  const init = async () => {
    const ethereum = getEthereumObject();
    if (!ethereum) {
      return;
    }

    setupEthereumEventListeners(ethereum);

    const hotel42NftContract = getSignedContract(
      addresses.localhost.hotel42NftContract,
      Hotel42NFT.abi
    );

    const hotel42Provider = getSignedContract(
      addresses.localhost.hotel42Provider,
      Hotel42Provider.abi
    );

    if (!hotel42NftContract || !hotel42Provider) {
      throw new Error('Contract not found: ', hotel42NftContract, hotel42Provider);
    };

    const currentAccount = await getCurrentAccount();
    setContracts({ hotel42NftContract, hotel42Provider });
    setAccount(currentAccount);
  };

  React.useEffect(() => {
    init();
  }, []);

  return (
    <ContractsContext.Provider value={contracts}>
      <AccountContext.Provider value={{
        address: account,
        setAddress: (addr) => setAccount(addr),
      }}>
        <ChakraProvider>
          <NavBar/>
          <Component/>
        </ChakraProvider>
      </AccountContext.Provider>
    </ContractsContext.Provider>
  );
}

export default App;
