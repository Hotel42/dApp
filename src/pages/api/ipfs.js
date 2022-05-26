import { pin_nft_IPFS } from '../../pinata-client';
import {ethers} from "ethers";
import addresses from '../../addresses.json';



const contract = require("/artifacts/contracts/Hotel42NFT.sol/Hotel42NFT.json")
const provider = new ethers.providers.getDefaultProvider("http://localhost:8545");

const hotel42NFTContract = new ethers.Contract(addresses.localhost.hotel42NftContract, contract.abi, provider);



export default async function handler(req, res) {

    const { privateReservationInfo, token_id, previousNFTipfsHash } = req.body;

    const pub_res_data_onchain = await hotel42NFTContract.getPublicResData(token_id);

    const pub_res_data_formatted = {
        hotelID: pub_res_data_onchain.hotelID.toNumber(),
        roomTypeID: pub_res_data_onchain.roomTypeID.toNumber(),
        checkInDate: pub_res_data_onchain.checkInDate,
        checkOutDate: pub_res_data_onchain.checkOutDate,
        city: pub_res_data_onchain.city,
        state: pub_res_data_onchain.state,
        hotelName: pub_res_data_onchain.hotelName,
        stars: pub_res_data_onchain.stars.toNumber(),
        imageURL: pub_res_data_onchain.imageURL
    }

    if (req.method === 'POST') {
        try {
            const ipfs_hash = await pin_nft_IPFS(privateReservationInfo, pub_res_data_formatted, previousNFTipfsHash);

            return res.json({ ipfs_hash })
        } catch (err) {
            console.error(err)

            return res.status(500).end();
        }
    } else {
        return res.status(404).end();
    }
}