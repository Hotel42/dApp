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
  CallOverrides,
} from "ethers";
import { BytesLike } from "@ethersproject/bytes";
import { Listener, Provider } from "@ethersproject/providers";
import { FunctionFragment, EventFragment, Result } from "@ethersproject/abi";
import type { TypedEventFilter, TypedEvent, TypedListener } from "./common";

interface Hotel42ProviderInterface extends ethers.utils.Interface {
  functions: {
    "addHotel(string,string,string,uint256,string)": FunctionFragment;
    "addRoomTypeByHotelId(string,uint256,uint256)": FunctionFragment;
    "getAllHotels()": FunctionFragment;
    "getHotelById(uint256)": FunctionFragment;
    "getPaymentInfo(uint256,uint256)": FunctionFragment;
    "getRoomTypesByHotelId(uint256)": FunctionFragment;
  };

  encodeFunctionData(
    functionFragment: "addHotel",
    values: [string, string, string, BigNumberish, string]
  ): string;
  encodeFunctionData(
    functionFragment: "addRoomTypeByHotelId",
    values: [string, BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllHotels",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getHotelById",
    values: [BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getPaymentInfo",
    values: [BigNumberish, BigNumberish]
  ): string;
  encodeFunctionData(
    functionFragment: "getRoomTypesByHotelId",
    values: [BigNumberish]
  ): string;

  decodeFunctionResult(functionFragment: "addHotel", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "addRoomTypeByHotelId",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllHotels",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getHotelById",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getPaymentInfo",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getRoomTypesByHotelId",
    data: BytesLike
  ): Result;

  events: {};
}

export class Hotel42Provider extends BaseContract {
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

  interface: Hotel42ProviderInterface;

  functions: {
    addHotel(
      name: string,
      city: string,
      state: string,
      stars: BigNumberish,
      imageUrl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    addRoomTypeByHotelId(
      name: string,
      price: BigNumberish,
      hotelId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<ContractTransaction>;

    getAllHotels(
      overrides?: CallOverrides
    ): Promise<
      [
        ([string, string, string, BigNumber, string, BigNumber, string] & {
          name: string;
          city: string;
          state: string;
          stars: BigNumber;
          imageUrl: string;
          id: BigNumber;
          owner: string;
        })[]
      ]
    >;

    getHotelById(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        [string, string, string, BigNumber, string, BigNumber, string] & {
          name: string;
          city: string;
          state: string;
          stars: BigNumber;
          imageUrl: string;
          id: BigNumber;
          owner: string;
        }
      ]
    >;

    getPaymentInfo(
      _hotelId: BigNumberish,
      _roomtTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string]>;

    getRoomTypesByHotelId(
      hotelId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [
        ([string, BigNumber, BigNumber] & {
          name: string;
          price: BigNumber;
          id: BigNumber;
        })[]
      ]
    >;
  };

  addHotel(
    name: string,
    city: string,
    state: string,
    stars: BigNumberish,
    imageUrl: string,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  addRoomTypeByHotelId(
    name: string,
    price: BigNumberish,
    hotelId: BigNumberish,
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<ContractTransaction>;

  getAllHotels(
    overrides?: CallOverrides
  ): Promise<
    ([string, string, string, BigNumber, string, BigNumber, string] & {
      name: string;
      city: string;
      state: string;
      stars: BigNumber;
      imageUrl: string;
      id: BigNumber;
      owner: string;
    })[]
  >;

  getHotelById(
    id: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    [string, string, string, BigNumber, string, BigNumber, string] & {
      name: string;
      city: string;
      state: string;
      stars: BigNumber;
      imageUrl: string;
      id: BigNumber;
      owner: string;
    }
  >;

  getPaymentInfo(
    _hotelId: BigNumberish,
    _roomtTypeId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<[BigNumber, string]>;

  getRoomTypesByHotelId(
    hotelId: BigNumberish,
    overrides?: CallOverrides
  ): Promise<
    ([string, BigNumber, BigNumber] & {
      name: string;
      price: BigNumber;
      id: BigNumber;
    })[]
  >;

  callStatic: {
    addHotel(
      name: string,
      city: string,
      state: string,
      stars: BigNumberish,
      imageUrl: string,
      overrides?: CallOverrides
    ): Promise<void>;

    addRoomTypeByHotelId(
      name: string,
      price: BigNumberish,
      hotelId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<void>;

    getAllHotels(
      overrides?: CallOverrides
    ): Promise<
      ([string, string, string, BigNumber, string, BigNumber, string] & {
        name: string;
        city: string;
        state: string;
        stars: BigNumber;
        imageUrl: string;
        id: BigNumber;
        owner: string;
      })[]
    >;

    getHotelById(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      [string, string, string, BigNumber, string, BigNumber, string] & {
        name: string;
        city: string;
        state: string;
        stars: BigNumber;
        imageUrl: string;
        id: BigNumber;
        owner: string;
      }
    >;

    getPaymentInfo(
      _hotelId: BigNumberish,
      _roomtTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<[BigNumber, string]>;

    getRoomTypesByHotelId(
      hotelId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<
      ([string, BigNumber, BigNumber] & {
        name: string;
        price: BigNumber;
        id: BigNumber;
      })[]
    >;
  };

  filters: {};

  estimateGas: {
    addHotel(
      name: string,
      city: string,
      state: string,
      stars: BigNumberish,
      imageUrl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    addRoomTypeByHotelId(
      name: string,
      price: BigNumberish,
      hotelId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<BigNumber>;

    getAllHotels(overrides?: CallOverrides): Promise<BigNumber>;

    getHotelById(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getPaymentInfo(
      _hotelId: BigNumberish,
      _roomtTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getRoomTypesByHotelId(
      hotelId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addHotel(
      name: string,
      city: string,
      state: string,
      stars: BigNumberish,
      imageUrl: string,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    addRoomTypeByHotelId(
      name: string,
      price: BigNumberish,
      hotelId: BigNumberish,
      overrides?: Overrides & { from?: string | Promise<string> }
    ): Promise<PopulatedTransaction>;

    getAllHotels(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getHotelById(
      id: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getPaymentInfo(
      _hotelId: BigNumberish,
      _roomtTypeId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getRoomTypesByHotelId(
      hotelId: BigNumberish,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}
