const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.pinataApiKey, process.env.pinataSecretApiKey);
import fetch from 'node-fetch';


//test Pinata connection
// pinata.testAuthentication().then((result) => {
//     console.log(result.authenticated);
// }).catch((err) => {
//     console.log(err);
// });


function changeJSON(jsonObj, key, newValue) {   //updates the key in the JSON
    for (let i in jsonObj) {
      if (i == key) {
        jsonObj[i] = newValue;
        return;
      }
    }
  }


//---------------------------------------WRITE to IPFS------------------------------------------------
let ipfs_hash = '';

(async function pin_NFT_to_IPFS() {

    let checkoutDate = new Date('may 18 2022');
    checkoutDate = checkoutDate.toISOString();      //inorder to query on date values they must be ISO_8601 format

    const nft_metadata = {
        firstName: '4',
        lastName: '4',
        email: '4',
        hotelName: '4',
        checkInDate: '4',       
        checkOutDate: checkoutDate,  
        roomType: '4',
        image: 'https://gateway.pinata.cloud/ipfs/QmVXTa57AAeEzLpxLfV2RGcPGa46UxxaRNy1KQcH71btfM',
        isSale: 'false'
    };

    const pinata_metadata = {           //everytime we write to IPFS we need to include Pinata metadata so we can query the data later
        pinataMetadata: {
            keyvalues: nft_metadata
        }
  };

    try {
        const result = await pinata.pinJSONToIPFS(nft_metadata, pinata_metadata);

        ipfs_hash = result.IpfsHash;

        console.log("Content pinned successfully. IPFS hash is: ", ipfs_hash);
        //console.log("Content pinned successfully", result.ipfsHash);
    } catch (err) {
        console.error("Content was not pinned", err);
    }
})();


//------------------------------------When NFT metadata updated, new ipfs hash generated therefore old hash must get unpinned-------------------------

(async function update_isSale_IPFS() {

    try {

        //const nftURL = await hotel42NftContract.tokenURI('pass token ID here');
        const nftURL = 'https://gateway.pinata.cloud/ipfs/QmUa2wbdVDjeEVEtdYN54kYfReouqHEk3dJWWyHuyxziEK';
        const response = await fetch(nftURL);

        const jsonObj = await response.json();

        //change the value of isSale to true
        changeJSON(jsonObj, 'isSale', 'true');
        console.log("JSON updated! ", jsonObj);

        const pinata_metadata = {
            pinataMetadata: {
                keyvalues: jsonObj
            }
        };

        //write new JSON to IPFS
        const result = await pinata.pinJSONToIPFS(jsonObj, pinata_metadata);
        console.log("Content pinned successfully. IPFS hash is: ", result.IpfsHash);

        //delete old JSON on IPFS
        const get_old_ipfs_hash = nftURL.substring(nftURL.lastIndexOf('/')+1);
        const output = await pinata.unpin(get_old_ipfs_hash);
        console.log(`unpinned hash: ${get_old_ipfs_hash} `, output);
        
    } catch (err) {

        console.log('Error:' + err);
    }
    
})();


/*------------------------------REMOVE specific NFT using ipfs hash -> when NFT metadata transfers ownership new ipfs--------------------------
                                hash is created therefore old one must get unpinned*/

(async function() {

    let hashToUnpin = 'QmUAkeBhDLRDTM8GT9vk8aPVhoUzfyLoEknQq8mk4ALrfh';     //we will get the hash by calling tokenURI from Hotel42NFT contract

    try {
        const result = await pinata.unpin(hashToUnpin);

        console.log("Content unpinned successfully: ", result);

    } catch (err) {

        console.error("Content was not unpinned: ", err);
    }
})();


//----------------------------------QUERY and REMOVE all NFTs that have checkout date < current date -> clean up expired reservations-------------------- 

(async function query_unpin_from_ipfs() {

    let current_date = new Date('may 19 2022');
    current_date = current_date.toISOString();

    const metadata_filter = {
        keyvalues: {
            checkOutDate: {
                value: current_date,
                op: 'lt'        //less than the 'value'
            }
        }
    };

    const filters = {
        metadata: metadata_filter
    };

    try {
        const result = await pinata.pinList(filters);

        console.log("Query successful: ", result.rows);

        for(let i in result.rows){
            let pin_hash = result.rows[i].ipfs_pin_hash;
            const output = await pinata.unpin(pin_hash);
            console.log(`unpinned hash ${pin_hash} `, output);
        }

    } catch (err) {
        
        console.error("Query not successful: ", err);
    }
})();