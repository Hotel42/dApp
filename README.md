# Hotel42 dApp
## Why we built this
Hotel reservations are an illiquid asset, what if plans change and you're no longer able to make the booking? There should be a cost effective way to sell your booking to another guest, that's why we built Hotel42. By turning hotel reservations into NFTs, which can then be freely traded.

## Features
- Reservation booking page to select a list of hotels to mint a NFT reservation
- Profile page to manage your reservations and list it for sale
- Marketplace to browse listed reservations to purchase

## Demo
https://www.youtube.com/watch?v=10kwBeJFu38&ab_channel=JKDuDaDuDe

## Tools used
- Next.js
- Chakra
- Solidity
- Hardhat
- IPFS

## How to quickly build contract
1. run `npx hardhat node` in the root directory to start local node
2. run `yarn hh:deploy:localhost` to deploy contracts and auto update addresses
3. run `yarn dev` to start dApp

Note: to get USDC into your test account, use the `Import Token` feature in Metamask and paste in the mock USDC contract address
## How to run the app
1. Install hardhat locally
2. run `yarn install`
3. run `npx hardhat node` in the root directory to start local node
4. run `npx hardhat compile` to compile any changes made to your smart contract
5. run `npx hardhat run --network localhost scripts/deployHotel42NFT.js` & `npx hardhat run --network localhost scripts/deployHotel42Provider.js` to deploy our compiled smart contract to the local blockchain running on localhost
6. When step 5 above completes successfully, it should tell you the deployed address in which the contract is deployoed at. Copy this address and go to `src/addresses.json`, and replace the localhost contract address of the hotel42 nft contract with the new address.
8. run yarn `yarn next dev` in the root directory to start the next.js frontend
