import { pin_nft_IPFS } from '../../pinata-client';
// const hre = require("hardhat");
// const { ethers } = hre;

export default async function handler(req, res) {
    const { privateReservationInfo, publicReservationInfo, previousNFTipfsHash } = req.body

    if (req.method === 'POST') {
        try {
            const ipfs_hash = await pin_nft_IPFS(privateReservationInfo, publicReservationInfo, previousNFTipfsHash);

            return res.json({ ipfs_hash })
        } catch (err) {
            console.error(err)

            return res.status(500).end();
        }
    } else {
        return res.status(404).end();
    }
}
