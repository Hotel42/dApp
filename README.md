# How to run the app
1. Download Hadhat https://hardhat.org/getting-started/#installation

2. Checkout root of repo `/dApp`
3. run `yarn install` in root of `/dApp`
4. run `npx hardhat node --watch` to run the local blockchain node
5. open another terminal window
6. cd into `/frontend`
7. run `yarn install` in root of `/frontend`
8. run `yarn start` to start the app
9. FE will be accessible on localhost:3000

# Setting up Metamask for local dev
#### The below steps will be quite strange, I haven't found a way around it, happy to update the steps if you folks do find a different way

1. Go to your Chrome browser and click on your user profile in the top right corner, to the left of the 3 dot button.
2. Setup a new chrome browser profile.
3. Download Metamask in this new chrome user profile.
4. A screen should show giving you 2 options, `Import wallet` and `Create a wallet`. Select `Import wallet`.
5. Once you click through eventually you'll arrive at a screen asking you enter your secret recovery phrase. The test recovery phrase must be enter as follows: `test test test test test test test test test test test test junk`
6. The wallet you just imported is a test wallet just for dev purposes.
7. Enter whatever you password you desire and hit import.
8. Go to  Metamask > Settings > Advanced, make sure `Show test networks` is set to `ON`
9. On the top right corner of the main Metamask page, you should see `Ethereum Mainnet` as a button, click on it and select `Add network`
10. In the drop down, select Localhost:8545. Note, this step does not mean that your wallet is now connected to your local blockchain node, it rather tells Metamask to send all future transactions it incurs to port 8545, which is your local blockchain node.
