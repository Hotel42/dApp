import pinataSDK from '@pinata/sdk';

const pinata = pinataSDK(process.env.pinataApiKey, process.env.pinataSecretApiKey);

const NFT_METADATA_NAME = 'Hotel42';

const parseMetadata = (reservationInfo, privateDataIFPSpin) => {
    const { imageUrl, ...toBeAttributes } = reservationInfo;
    const description = `Reservation for ${reservationInfo.hotelName}`

    const attributes = Object.entries({ ...toBeAttributes, privateBookingInfoUri: privateDataIFPSpin }).map(([key, value]) => {
        return { trait_type: key, value }
    })

    const pinataKeyvalues = {
        name: NFT_METADATA_NAME,
        description,
        image: imageUrl,
        canonicalHotelId: reservationInfo.canonicalHotelId,
        canonicalHotelAddress: reservationInfo.canonicalHotelAddress,
        nftAddress: reservationInfo.nftAddress,
    }

    return {
        nftMetadata: {
            name: NFT_METADATA_NAME,
            description,
            image: imageUrl,
            attributes
        },
        pinataKeyvalues,
    }
}

const ipfs_base_url = "https://gateway.pinata.cloud/ipfs/";

const pinToIPFS = async (nftMetadata, pinataKeyvalues) => {
    const result = await pinata.pinJSONToIPFS(nftMetadata, {
        pinataMetadata: {
            keyvalues: pinataKeyvalues ?? nftMetadata
        }
    });

    return result.IpfsHash
}

const unpinPromises = previousNFTipfsHashes => {
    if (previousNFTipfsHashes) {
        return previousNFTipfsHashes.map(previousNFTipfsHash => pinata.unpin(previousNFTipfsHash))
    }

    return [Promise.resolve()]
}

export async function pin_nft_IPFS(privateReservationInfo, publicReservationInfo, previousNFTipfsHashes) {
    const privateDataIFPSpin = await pinToIPFS(privateReservationInfo)
    const privateDataIPFSuri = `${ipfs_base_url}${privateDataIFPSpin}`;

    const { nftMetadata, pinataKeyvalues } = parseMetadata(publicReservationInfo, privateDataIPFSuri);

    const [ipfsCid] = await Promise.all([
        pinToIPFS(nftMetadata, pinataKeyvalues),
        ...unpinPromises(previousNFTipfsHashes)
    ])

    return ipfsCid;
}
