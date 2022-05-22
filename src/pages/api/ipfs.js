import { pin_nft_IPFS } from '../../pinata-client';

export default async function handler(req, res) {
    const { firstName, lastName, email, previousNFTipfsHash } = req.body
    if (req.method === 'POST') {
        try {
            const ipfsHash = await pin_nft_IPFS({ firstName, lastName, email }, previousNFTipfsHash);

            return res.json({ ipfsHash })
        } catch (err) {
            console.error(err)

            return res.status(500).end();
        }
    } else {
        return res.status(404).end();
    }
}
