import {ChakraProvider} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import "focus-visible/dist/focus-visible"
import {NETWORKS, Provider} from "@web3-ui/core";

function App({ Component }) {
  return (
    <Provider network={NETWORKS.rinkeby}>
      <ChakraProvider>
        <NavBar/>
        <Component/>
      </ChakraProvider>
    </Provider>
  );
}

export default App;