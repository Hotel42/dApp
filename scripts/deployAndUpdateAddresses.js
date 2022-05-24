// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");
const camelCase = require('camelcase');
const { readFileSync, writeFileSync } = require('fs')

const { mockUSDCconstructorArgs, onComplete: usdcComplete } = require('./deployMockUSDC');
const { onComplete: providerComplete } = require('./deployHotel42Provider')

const contractConfig = usdcAddress => [
    { name: "Hotel42NFT", configName: "hotel42NftContract", constructorArgs: [usdcAddress] },
    { name: "Hotel42Provider", onComplete: providerComplete },
    { name: "Hotel42Marketplace", constructorArgs: [usdcAddress] }
];

async function deployContract({ name, configName, constructorArgs = [], onComplete = async () => ({}) }) {
    // Hardhat always runs the compile task when running scripts with its command
    // line interface.
    //
    // If this script is run directly using `node` you may want to call compile
    // manually to make sure everything is compiled
    // await hre.run('compile');

    // We get the contract to deploy
    const deployTxn = await hre.ethers.getContractFactory(name);
    const contract = await deployTxn.deploy(...constructorArgs);

    await contract.deployed();

    console.log(`${name} deployed to: ${contract.address}`);

    await onComplete(contract);

    return { config: { [camelCase(configName || name)]: contract.address }, contract }
}

(async function () {
    const { config: usdcConfig, contract: mockUSDC } = await deployContract({ name: "MockUSDC", constructorArgs: mockUSDCconstructorArgs, onComplete: usdcComplete })
    const newConfigsArray = await Promise.all(contractConfig(mockUSDC.address).map(deployContract))
    const newConfig = newConfigsArray.reduce((acc, configObj) => {
        return { ...acc, ...configObj.config }
    }, { ...usdcConfig })

    const addresses = JSON.parse(readFileSync('./src/addresses.json'));

    const newAddresses = {
        ...addresses,
        localhost: newConfig
    }

    writeFileSync('./src/addresses.json', JSON.stringify(newAddresses, null, 2))
})()
