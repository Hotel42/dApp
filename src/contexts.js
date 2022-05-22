
import { createContext, useContext } from 'react';;

export const AccountContext = createContext({
  address: null,
  setAddress: (addr) => this.address = addr,
});
export const ContractsContext = createContext({
  hotel42NftContract: null,
  hotel42Provider: null,
})

export function useAccount() {
    return useContext(AccountContext);
}
export function useContracts() {
    return useContext(ContractsContext);
}
