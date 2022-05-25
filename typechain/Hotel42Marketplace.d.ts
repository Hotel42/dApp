/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import {
  ethers,
  EventFilter,
  Signer,
  BigNumber,
  BigNumberish,
  PopulatedTransaction,
  BaseContract,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface Hotel42MarketplaceInterface extends ethers.utils.Interface {
  functions: {
    "createMarketItem(address,uint256,uint256)": FunctionFragment;
    "deleteMarketListing(uint256)": FunctionFragment;
    "getAllMarketItemIds()": FunctionFragment;
    "listingsByContract(address,uint256)": FunctionFragment;
    "marketItemReference(uint256)": FunctionFragment;
    "marketListingIds(uint256)": FunctionFragment;
    "owner()": FunctionFragment;
    "purchaseMarketItem(uint256)": FunctionFragment;
    "renounceOwnership()": FunctionFragment;
    "transferOwnership(address)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "createMarketItem",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "deleteMarketListing",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllMarketItemIds",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "listingsByContract",
    values: [string, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "marketItemReference",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "marketListingIds",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(functionFragment: "owner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "purchaseMarketItem",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "renounceOwnership",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "transferOwnership",
    values: [string]
  ): string;

  decodeFunctionResult(
    functionFragment: "createMarketItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "deleteMarketListing",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllMarketItemIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "listingsByContract",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "marketItemReference",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "marketListingIds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "owner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "purchaseMarketItem",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "renounceOwnership",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "transferOwnership",
    data: BytesLike
  ): Result;

  events: {
    "MarketItemCreated(uint256,address,uint256)": EventFragment;
    "MarketItemDeleted(uint256,address,uint256)": EventFragment;
    "MarketItemSold(uint256,address,uint256)": EventFragment;
    "OwnershipTransferred(address,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "MarketItemCreated"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemDeleted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MarketItemSold"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "OwnershipTransferred"): EventFragment;
}

export type MarketItemCreatedEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    marketListingId: BigNumber;
    nftContract: string;
    tokenId: BigNumber;
  }
>;

export type MarketItemDeletedEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    marketListingId: BigNumber;
    nftContract: string;
    tokenId: BigNumber;
  }
>;

export type MarketItemSoldEvent = TypedEvent<
  [BigNumber, string, BigNumber] & {
    marketListingId: BigNumber;
    nftContract: string;
    tokenId: BigNumber;
  }
>;

export type OwnershipTransferredEvent = TypedEvent<
  [string, string] & { previousOwner: string; newOwner: string }
>;

export class Hotel42Marketplace extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  listeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter?: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): Array<TypedListener<EventArgsArray, EventArgsObject>>;
  off<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  on<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  once<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeListener<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>,
    listener: TypedListener<EventArgsArray, EventArgsObject>
  ): this;
  removeAllListeners<EventArgsArray extends Array<any>, EventArgsObject>(
    eventFilter: TypedEventFilter<EventArgsArray, EventArgsObject>
  ): this;

  listeners(eventName?: string): Array<Listener>;
  off(eventName: string, listener: Listener): this;
  on(eventName: string, listener: Listener): this;
  once(eventName: string, listener: Listener): this;
  removeListener(eventName: string, listener: Listener): this;
  removeAllListeners(eventName?: string): this;

  queryFilter<EventArgsArray extends Array<any>, EventArgsObject>(
    event: TypedEventFilter<EventArgsArray, EventArgsObject>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TypedEvent<EventArgsArray & EventArgsObject>>>;

  interface: Hotel42MarketplaceInterface;

  functions: {
    createMarketItem(
      _nftContract: string,
      _tokenId: BigNumberish,
      _sellPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    deleteMarketListing(
      _marketListingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAllMarketItemIds(overrides?: CallOverrides): Promise<[BigNumber[]]>;

    listingsByContract(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { seller: string; price: BigNumber }>;

    marketItemReference(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { nftContract: string; tokenId: BigNumber }
    >;

    marketListingIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    owner(overrides?: CallOverrides): Promise<[string]>;

    purchaseMarketItem(
      _marketListingId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;
  };

  createMarketItem(
    _nftContract: string,
    _tokenId: BigNumberish,
    _sellPrice: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  deleteMarketListing(
    _marketListingId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAllMarketItemIds(overrides?: CallOverrides): Promise<BigNumber[]>;

  listingsByContract(
    arg0: string,
    arg1: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { seller: string; price: BigNumber }>;

  marketItemReference(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[string, BigNumber] & { nftContract: string; tokenId: BigNumber }>;

  marketListingIds(
    arg0: BigNumberish,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  owner(overrides?: CallOverrides): Promise<string>;

  purchaseMarketItem(
    _marketListingId: BigNumberish,
    overrides?: PayableOverrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  renounceOwnership(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  transferOwnership(
    newOwner: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    createMarketItem(
      _nftContract: string,
      _tokenId: BigNumberish,
      _sellPrice: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    deleteMarketListing(
      _marketListingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getAllMarketItemIds(overrides?: CallOverrides): Promise<BigNumber[]>;

    listingsByContract(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[string, BigNumber] & { seller: string; price: BigNumber }>;

    marketItemReference(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, BigNumber] & { nftContract: string; tokenId: BigNumber }
    >;

    marketListingIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<string>;

    purchaseMarketItem(
      _marketListingId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    renounceOwnership(overrides?: CallOverrides): Promise<void>;

    transferOwnership(
      newOwner: string,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "MarketItemCreated(uint256,address,uint256)"(
      marketListingId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { marketListingId: BigNumber; nftContract: string; tokenId: BigNumber }
    >;

    MarketItemCreated(
      marketListingId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { marketListingId: BigNumber; nftContract: string; tokenId: BigNumber }
    >;

    "MarketItemDeleted(uint256,address,uint256)"(
      marketListingId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { marketListingId: BigNumber; nftContract: string; tokenId: BigNumber }
    >;

    MarketItemDeleted(
      marketListingId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { marketListingId: BigNumber; nftContract: string; tokenId: BigNumber }
    >;

    "MarketItemSold(uint256,address,uint256)"(
      marketListingId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { marketListingId: BigNumber; nftContract: string; tokenId: BigNumber }
    >;

    MarketItemSold(
      marketListingId?: BigNumberish | null,
      nftContract?: string | null,
      tokenId?: null
    ): TypedEventFilter<
      [BigNumber, string, BigNumber],
      { marketListingId: BigNumber; nftContract: string; tokenId: BigNumber }
    >;

    "OwnershipTransferred(address,address)"(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;

    OwnershipTransferred(
      previousOwner?: string | null,
      newOwner?: string | null
    ): TypedEventFilter<
      [string, string],
      { previousOwner: string; newOwner: string }
    >;
  };

  estimateGas: {
    createMarketItem(
      _nftContract: string,
      _tokenId: BigNumberish,
      _sellPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    deleteMarketListing(
      _marketListingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAllMarketItemIds(overrides?: CallOverrides): Promise<BigNumber>;

    listingsByContract(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    marketItemReference(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    marketListingIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    owner(overrides?: CallOverrides): Promise<BigNumber>;

    purchaseMarketItem(
      _marketListingId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    createMarketItem(
      _nftContract: string,
      _tokenId: BigNumberish,
      _sellPrice: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    deleteMarketListing(
      _marketListingId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAllMarketItemIds(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listingsByContract(
      arg0: string,
      arg1: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    marketItemReference(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    marketListingIds(
      arg0: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    owner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    purchaseMarketItem(
      _marketListingId: BigNumberish,
      overrides?: PayableOverrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    renounceOwnership(
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    transferOwnership(
      newOwner: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;
  };
}
