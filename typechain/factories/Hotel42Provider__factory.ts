/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */

import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import { Provider, TransactionRequest } from "@ethersproject/providers";
import type {
  Hotel42Provider,
  Hotel42ProviderInterface,
} from "../Hotel42Provider";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "city",
        type: "string",
      },
      {
        internalType: "string",
        name: "state",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "stars",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "imageUrl",
        type: "string",
      },
    ],
    name: "addHotel",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "price",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "hotelId",
        type: "uint256",
      },
    ],
    name: "addRoomTypeByHotelId",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "getAllHotels",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "city",
            type: "string",
          },
          {
            internalType: "string",
            name: "state",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "stars",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "imageUrl",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        internalType: "struct Hotel42Provider.Hotel[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "id",
        type: "uint256",
      },
    ],
    name: "getHotelById",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "string",
            name: "city",
            type: "string",
          },
          {
            internalType: "string",
            name: "state",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "stars",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "imageUrl",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "owner",
            type: "address",
          },
        ],
        internalType: "struct Hotel42Provider.Hotel",
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_hotelId",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_roomtTypeId",
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
  {
    inputs: [
      {
        internalType: "uint256",
        name: "hotelId",
        type: "uint256",
      },
    ],
    name: "getRoomTypesByHotelId",
    outputs: [
      {
        components: [
          {
            internalType: "string",
            name: "name",
            type: "string",
          },
          {
            internalType: "uint256",
            name: "price",
            type: "uint256",
          },
          {
            internalType: "uint256",
            name: "id",
            type: "uint256",
          },
        ],
        internalType: "struct Hotel42Provider.RoomType[]",
        name: "",
        type: "tuple[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611b1d806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c806301dc7b02146100675780637379193414610083578063d91d20e2146100b3578063d91da579146100d1578063de9ab85f14610102578063fa42cd6d1461011e575b600080fd5b610081600480360381019061007c91906112f6565b61014e565b005b61009d600480360381019061009891906113e1565b61039f565b6040516100aa91906115b7565b60405180910390f35b6100bb6104cc565b6040516100c8919061178d565b60405180910390f35b6100eb60048036038101906100e691906117af565b6107dd565b6040516100f992919061180d565b60405180910390f35b61011c60048036038101906101179190611836565b610c4d565b005b610138600480360381019061013391906113e1565b610d58565b6040516101459190611956565b60405180910390f35b600061015a600061104c565b905060006040518060e001604052808881526020018781526020018681526020018581526020018481526020018381526020013373ffffffffffffffffffffffffffffffffffffffff168152509050806002600084815260200190815260200160002060008201518160000190805190602001906101d9929190611070565b5060208201518160010190805190602001906101f6929190611070565b506040820151816002019080519060200190610213929190611070565b5060608201518160030155608082015181600401908051906020019061023a929190611070565b5060a0820151816005015560c08201518160060160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550905050600381908060018154018082558091505060019003906000526020600020906007020160009091909190915060008201518160000190805190602001906102d7929190611070565b5060208201518160010190805190602001906102f4929190611070565b506040820151816002019080519060200190610311929190611070565b50606082015181600301556080820151816004019080519060200190610338929190611070565b5060a0820151816005015560c08201518160060160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050610396600061105a565b50505050505050565b60606103ab600061104c565b82106103b657600080fd5b60046000838152602001908152602001600020805480602002602001604051908101604052809291908181526020016000905b828210156104c1578382906000526020600020906003020160405180606001604052908160008201805461041c906119a7565b80601f0160208091040260200160405190810160405280929190818152602001828054610448906119a7565b80156104955780601f1061046a57610100808354040283529160200191610495565b820191906000526020600020905b81548152906001019060200180831161047857829003601f168201915b5050505050815260200160018201548152602001600282015481525050815260200190600101906103e9565b505050509050919050565b60606003805480602002602001604051908101604052809291908181526020016000905b828210156107d457838290600052602060002090600702016040518060e0016040529081600082018054610523906119a7565b80601f016020809104026020016040519081016040528092919081815260200182805461054f906119a7565b801561059c5780601f106105715761010080835404028352916020019161059c565b820191906000526020600020905b81548152906001019060200180831161057f57829003601f168201915b505050505081526020016001820180546105b5906119a7565b80601f01602080910402602001604051908101604052809291908181526020018280546105e1906119a7565b801561062e5780601f106106035761010080835404028352916020019161062e565b820191906000526020600020905b81548152906001019060200180831161061157829003601f168201915b50505050508152602001600282018054610647906119a7565b80601f0160208091040260200160405190810160405280929190818152602001828054610673906119a7565b80156106c05780601f10610695576101008083540402835291602001916106c0565b820191906000526020600020905b8154815290600101906020018083116106a357829003601f168201915b50505050508152602001600382015481526020016004820180546106e3906119a7565b80601f016020809104026020016040519081016040528092919081815260200182805461070f906119a7565b801561075c5780601f106107315761010080835404028352916020019161075c565b820191906000526020600020905b81548152906001019060200180831161073f57829003601f168201915b50505050508152602001600582015481526020016006820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1681525050815260200190600101906104f0565b50505050905090565b6000806000600260008681526020019081526020016000206040518060e0016040529081600082018054610810906119a7565b80601f016020809104026020016040519081016040528092919081815260200182805461083c906119a7565b80156108895780601f1061085e57610100808354040283529160200191610889565b820191906000526020600020905b81548152906001019060200180831161086c57829003601f168201915b505050505081526020016001820180546108a2906119a7565b80601f01602080910402602001604051908101604052809291908181526020018280546108ce906119a7565b801561091b5780601f106108f05761010080835404028352916020019161091b565b820191906000526020600020905b8154815290600101906020018083116108fe57829003601f168201915b50505050508152602001600282018054610934906119a7565b80601f0160208091040260200160405190810160405280929190818152602001828054610960906119a7565b80156109ad5780601f10610982576101008083540402835291602001916109ad565b820191906000526020600020905b81548152906001019060200180831161099057829003601f168201915b50505050508152602001600382015481526020016004820180546109d0906119a7565b80601f01602080910402602001604051908101604052809291908181526020018280546109fc906119a7565b8015610a495780601f10610a1e57610100808354040283529160200191610a49565b820191906000526020600020905b815481529060010190602001808311610a2c57829003601f168201915b50505050508152602001600582015481526020016006820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050600060056000868152602001908152602001600020604051806060016040529081600082018054610ae4906119a7565b80601f0160208091040260200160405190810160405280929190818152602001828054610b10906119a7565b8015610b5d5780601f10610b3257610100808354040283529160200191610b5d565b820191906000526020600020905b815481529060010190602001808311610b4057829003601f168201915b50505050508152602001600182015481526020016002820154815250509050600073ffffffffffffffffffffffffffffffffffffffff168260c0015173ffffffffffffffffffffffffffffffffffffffff1603610bef576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610be690611a5b565b60405180910390fd5b6000816020015103610c36576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c2d90611ac7565b60405180910390fd5b80602001518260c001519350935050509250929050565b610c57600061104c565b8110610c6257600080fd5b6000610c6e600161104c565b90506000604051806060016040528086815260200185815260200183815250905080600560008481526020019081526020016000206000820151816000019080519060200190610cbf929190611070565b506020820151816001015560408201518160020155905050610ce1600161105a565b600460008481526020019081526020016000208190806001815401808255809150506001900390600052602060002090600302016000909190919091506000820151816000019080519060200190610d3a929190611070565b50602082015181600101556040820151816002015550505050505050565b610d606110f6565b610d6a600061104c565b8210610d7557600080fd5b600260008381526020019081526020016000206040518060e0016040529081600082018054610da3906119a7565b80601f0160208091040260200160405190810160405280929190818152602001828054610dcf906119a7565b8015610e1c5780601f10610df157610100808354040283529160200191610e1c565b820191906000526020600020905b815481529060010190602001808311610dff57829003601f168201915b50505050508152602001600182018054610e35906119a7565b80601f0160208091040260200160405190810160405280929190818152602001828054610e61906119a7565b8015610eae5780601f10610e8357610100808354040283529160200191610eae565b820191906000526020600020905b815481529060010190602001808311610e9157829003601f168201915b50505050508152602001600282018054610ec7906119a7565b80601f0160208091040260200160405190810160405280929190818152602001828054610ef3906119a7565b8015610f405780601f10610f1557610100808354040283529160200191610f40565b820191906000526020600020905b815481529060010190602001808311610f2357829003601f168201915b5050505050815260200160038201548152602001600482018054610f63906119a7565b80601f0160208091040260200160405190810160405280929190818152602001828054610f8f906119a7565b8015610fdc5780601f10610fb157610100808354040283529160200191610fdc565b820191906000526020600020905b815481529060010190602001808311610fbf57829003601f168201915b50505050508152602001600582015481526020016006820160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815250509050919050565b600081600001549050919050565b6001816000016000828254019250508190555050565b82805461107c906119a7565b90600052602060002090601f01602090048101928261109e57600085556110e5565b82601f106110b757805160ff19168380011785556110e5565b828001600101855582156110e5579182015b828111156110e45782518255916020019190600101906110c9565b5b5090506110f29190611149565b5090565b6040518060e00160405280606081526020016060815260200160608152602001600081526020016060815260200160008152602001600073ffffffffffffffffffffffffffffffffffffffff1681525090565b5b8082111561116257600081600090555060010161114a565b5090565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b6111cd82611184565b810181811067ffffffffffffffff821117156111ec576111eb611195565b5b80604052505050565b60006111ff611166565b905061120b82826111c4565b919050565b600067ffffffffffffffff82111561122b5761122a611195565b5b61123482611184565b9050602081019050919050565b82818337600083830152505050565b600061126361125e84611210565b6111f5565b90508281526020810184848401111561127f5761127e61117f565b5b61128a848285611241565b509392505050565b600082601f8301126112a7576112a661117a565b5b81356112b7848260208601611250565b91505092915050565b6000819050919050565b6112d3816112c0565b81146112de57600080fd5b50565b6000813590506112f0816112ca565b92915050565b600080600080600060a0868803121561131257611311611170565b5b600086013567ffffffffffffffff8111156113305761132f611175565b5b61133c88828901611292565b955050602086013567ffffffffffffffff81111561135d5761135c611175565b5b61136988828901611292565b945050604086013567ffffffffffffffff81111561138a57611389611175565b5b61139688828901611292565b93505060606113a7888289016112e1565b925050608086013567ffffffffffffffff8111156113c8576113c7611175565b5b6113d488828901611292565b9150509295509295909350565b6000602082840312156113f7576113f6611170565b5b6000611405848285016112e1565b91505092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600081519050919050565b600082825260208201905092915050565b60005b83811015611474578082015181840152602081019050611459565b83811115611483576000848401525b50505050565b60006114948261143a565b61149e8185611445565b93506114ae818560208601611456565b6114b781611184565b840191505092915050565b6114cb816112c0565b82525050565b600060608301600083015184820360008601526114ee8282611489565b915050602083015161150360208601826114c2565b50604083015161151660408601826114c2565b508091505092915050565b600061152d83836114d1565b905092915050565b6000602082019050919050565b600061154d8261140e565b6115578185611419565b9350836020820285016115698561142a565b8060005b858110156115a557848403895281516115868582611521565b945061159183611535565b925060208a0199505060018101905061156d565b50829750879550505050505092915050565b600060208201905081810360008301526115d18184611542565b905092915050565b600081519050919050565b600082825260208201905092915050565b6000819050602082019050919050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061163082611605565b9050919050565b61164081611625565b82525050565b600060e08301600083015184820360008601526116638282611489565b9150506020830151848203602086015261167d8282611489565b915050604083015184820360408601526116978282611489565b91505060608301516116ac60608601826114c2565b50608083015184820360808601526116c48282611489565b91505060a08301516116d960a08601826114c2565b5060c08301516116ec60c0860182611637565b508091505092915050565b60006117038383611646565b905092915050565b6000602082019050919050565b6000611723826115d9565b61172d81856115e4565b93508360208202850161173f856115f5565b8060005b8581101561177b578484038952815161175c85826116f7565b94506117678361170b565b925060208a01995050600181019050611743565b50829750879550505050505092915050565b600060208201905081810360008301526117a78184611718565b905092915050565b600080604083850312156117c6576117c5611170565b5b60006117d4858286016112e1565b92505060206117e5858286016112e1565b9150509250929050565b6117f8816112c0565b82525050565b61180781611625565b82525050565b600060408201905061182260008301856117ef565b61182f60208301846117fe565b9392505050565b60008060006060848603121561184f5761184e611170565b5b600084013567ffffffffffffffff81111561186d5761186c611175565b5b61187986828701611292565b935050602061188a868287016112e1565b925050604061189b868287016112e1565b9150509250925092565b600060e08301600083015184820360008601526118c28282611489565b915050602083015184820360208601526118dc8282611489565b915050604083015184820360408601526118f68282611489565b915050606083015161190b60608601826114c2565b50608083015184820360808601526119238282611489565b91505060a083015161193860a08601826114c2565b5060c083015161194b60c0860182611637565b508091505092915050565b6000602082019050818103600083015261197081846118a5565b905092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806119bf57607f821691505b6020821081036119d2576119d1611978565b5b50919050565b600082825260208201905092915050565b7f5061796d656e7420726563697069656e742063616e2774206265207a65726f2060008201527f6164647265737300000000000000000000000000000000000000000000000000602082015250565b6000611a456027836119d8565b9150611a50826119e9565b604082019050919050565b60006020820190508181036000830152611a7481611a38565b9050919050565b7f50726963652063616e2774206265207a65726f00000000000000000000000000600082015250565b6000611ab16013836119d8565b9150611abc82611a7b565b602082019050919050565b60006020820190508181036000830152611ae081611aa4565b905091905056fea264697066735822122035815a08ea440adf2953b60962602fdeaa3d8f505cc4324d0804654ce1bf651c64736f6c634300080d0033";

export class Hotel42Provider__factory extends ContractFactory {
  constructor(
    ...args: [signer: Signer] | ConstructorParameters<typeof ContractFactory>
  ) {
    if (args.length === 1) {
      super(_abi, _bytecode, args[0]);
    } else {
      super(...args);
    }
  }

  deploy(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): Promise<Hotel42Provider> {
    return super.deploy(overrides || {}) as Promise<Hotel42Provider>;
  }
  getDeployTransaction(
    overrides?: Overrides & { from?: string | Promise<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  attach(address: string): Hotel42Provider {
    return super.attach(address) as Hotel42Provider;
  }
  connect(signer: Signer): Hotel42Provider__factory {
    return super.connect(signer) as Hotel42Provider__factory;
  }
  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Hotel42ProviderInterface {
    return new utils.Interface(_abi) as Hotel42ProviderInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Hotel42Provider {
    return new Contract(address, _abi, signerOrProvider) as Hotel42Provider;
  }
}
