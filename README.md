# Hotel42 dApp

## How to quickly build contract
1. run `npx hardhat node` in the root directory to start local node
2. run `yarn hh:deploy:localhost` to deploy contracts and auto update addresses
3. run `yarn dev` to start dApp

## How to run the app
1. Install hardhat locally
2. run `yarn install`
3. run `npx hardhat node` in the root directory to start local node
4. run `npx hardhat compile` to compile any changes made to your smart contract
5. run `npx hardhat run --network localhost scripts/deployHotel42NFT.js` & `npx hardhat run --network localhost scripts/deployHotel42Provider.js` to deploy our compiled smart contract to the local blockchain running on localhost
6. When step 5 above completes successfully, it should tell you the deployed address in which the contract is deployoed at. Copy this address and go to `src/addresses.json`, and replace the localhost contract address of the hotel42 nft contract with the new address.
8. run yarn `yarn next dev` in the root directory to start the next.js frontend
