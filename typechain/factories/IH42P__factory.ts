/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Contract, Signer, utils } from "ethers";
import { Provider } from "@ethersproject/providers";
import type { IH42P, IH42PInterface } from "../IH42P";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_hotelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_roomType",
        type: "uint256",
      },
    ],
    name: "getPaymentInfo",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

export class IH42P__factory {
  static readonly abi = _abi;
  static createInterface(): IH42PInterface {
    return new utils.Interface(_abi) as IH42PInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): IH42P {
    return new Contract(address, _abi, signerOrProvider) as IH42P;
  }
}
