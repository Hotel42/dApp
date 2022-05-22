import pinataSDK from '@pinata/sdk';

const pinata = pinataSDK(process.env.pinataApiKey, process.env.pinataSecretApiKey);

export async function pin_nft_IPFS(nftPrivateData, previousNFTipfsHash) {
    const [result] = await Promise.all([
        pinata.pinJSONToIPFS(nftPrivateData, {
            pinataMetadata: {
                keyvalues: nftPrivateData
            }
        }),
        previousNFTipfsHash ? pinata.unpin(previousNFTipfsHash) : Promise.resolve(),
    ])

    return result.IpfsHash;
}

//-----------------------IPFS functionality----------------------

// const ipfs_base_url = "https://gateway.pinata.cloud/ipfs/";

// function update_sale_status_IPFS(nftURL) {

//     try {

//         const response = await fetch(nftURL);

//         const jsonObj = await response.json();

//         if (jsonObj.isSale == 'true') {
//             changeJSON(jsonObj, 'isSale', 'false');  //change the value of isSale to true
//         } else {
//             changeJSON(jsonObj, 'isSale', 'true');
//         }


//         const pinata_metadata = {
//             pinataMetadata: {
//                 keyvalues: jsonObj
//             }
//         };

//         //write new JSON to IPFS
//         const result = await pinata.pinJSONToIPFS(jsonObj, pinata_metadata);

//         //delete old JSON on IPFS
//         const get_old_ipfs_hash = nftURL.substring(nftURL.lastIndexOf('/') + 1);
//         const output = await pinata.unpin(get_old_ipfs_hash);

//         return result.IpfsHash;     //returns hash of the updated nft

//     } catch (err) {

//         console.log('could not update sale status of nft:' + err);
//     }

// }


// TODO: might need this for check-out functionality
// function cleanup_expired_res_IPFS() {           //unpin reservations where check out date < current date

//     let current_date = new Date();
//     current_date = current_date.toISOString();      //ipfs only accepts ISO format for dates

//     const metadata_filter = {
//         keyvalues: {
//             checkOutDate: {
//                 value: current_date,
//                 op: 'lt'        //less than the 'value'
//             }
//         }
//     };

//     const filters = {
//         metadata: metadata_filter
//     };

//     try {
//         const result = await pinata.pinList(filters);

//         //console.log("Query successful: ", result.rows);

//         for (let i in result.rows) {
//             let pin_hash = result.rows[i].ipfs_pin_hash;
//             const output = await pinata.unpin(pin_hash);
//             console.log(`unpinned hash ${pin_hash} `, output);
//         }

//     } catch (err) {

//         console.error("could not cleanup expired reservations: ", err);
//     }
// }


// function update_reservation_details_IPFS(nftURL, first, last, email) {      //when user clicks to buy a reservation on sale, they must also update reservation details

//     try {

//         const response = await fetch(nftURL);

//         const jsonObj = await response.json();

//         //update res details - first name, last name, email and update sale status=false
//         changeJSON(jsonObj, 'firstName', first);
//         changeJSON(jsonObj, 'lastName', last);
//         changeJSON(jsonObj, 'email', email);
//         changeJSON(jsonObj, 'isSale', 'false');

//         const pinata_metadata = {
//             pinataMetadata: {
//                 keyvalues: jsonObj
//             }
//         };

//         //write new JSON to IPFS
//         const result = await pinata.pinJSONToIPFS(jsonObj, pinata_metadata);

//         //delete old JSON on IPFS
//         const get_old_ipfs_hash = nftURL.substring(nftURL.lastIndexOf('/') + 1);
//         const output = await pinata.unpin(get_old_ipfs_hash);

//         return result.IpfsHash;     //returns hash of updated json

//     } catch (err) {

//         console.log('could not update sale status of nft:' + err);
//     }
// }