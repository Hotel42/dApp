const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.pinataApiKey, process.env.pinataSecretApiKey);
import fetch from 'node-fetch';

//-----------------------IPFS functionality----------------------

const ipfs_base_url = "https://gateway.pinata.cloud/ipfs/";

function changeJSON(jsonObj, key, newValue) {   //updates the key in a JSON object
    for (let i in jsonObj) {
      if (i == key) {
        jsonObj[i] = newValue;
        return;
      }
    }
  }


function update_sale_status_IPFS(nftURL) {           //when user wishes to put their reservation for sale

    try {

        const response = await fetch(nftURL);

        const jsonObj = await response.json();

        //change the value of isSale to true
        changeJSON(jsonObj, 'isSale', 'true');

        const pinata_metadata = {
            pinataMetadata: {
                keyvalues: jsonObj
            }
        };

        //write new JSON to IPFS
        const result = await pinata.pinJSONToIPFS(jsonObj, pinata_metadata);

        //delete old JSON on IPFS
        const get_old_ipfs_hash = nftURL.substring(nftURL.lastIndexOf('/')+1);
        const output = await pinata.unpin(get_old_ipfs_hash);

        return result.IpfsHash;     //returns hash of the updated nft
        
    } catch (err) {

        console.log('could not update sale status of nft:' + err);
    }
    
}


function pin_nft_IPFS(json_obj, pinata_metadata) {

    try {
        const result = await pinata.pinJSONToIPFS(json_obj, pinata_metadata);

        return result.IpfsHash;         //returns hash of pinned nft

    } catch (err) {
        console.error("Content was not pinned", err);
    }
}


function cleanup_expired_res_IPFS() {           //unpin reservations where check out date < current date

    let current_date = new Date();
    current_date = current_date.toISOString();      //ipfs only accepts ISO format for dates

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

        //console.log("Query successful: ", result.rows);

        for(let i in result.rows){
            let pin_hash = result.rows[i].ipfs_pin_hash;
            const output = await pinata.unpin(pin_hash);
            console.log(`unpinned hash ${pin_hash} `, output);
        }

    } catch (err) {
        
        console.error("could not cleanup expired reservations: ", err);
    }
}


function get_all_nfts_onsale_IPFS() {

    const sale_nfts = [];

    const metadata_filter = {
        keyvalues: {
            isSale: {
                value: 'true',
                op: 'eq'        //equal to the 'value'
            }
        }
    };

    const filters = {
        metadata: metadata_filter
    };

    try {
        const result = await pinata.pinList(filters);

        for(let i in result.rows){
            let pin_hash = result.rows[i].ipfs_pin_hash;
            let nft_url = ipfs_base_url + pin_hash;         //concatenate ipfs base url with ipfs hash

            //fetch json from ipfs
            const response = await fetch(nft_url);
            const jsonObj = await response.json();

            sale_nfts.push(jsonObj);
        }

        return sale_nfts;       //array of json objects for each nft on sale

    } catch (err) {
        
        console.error("could not get nfts on sale: ", err);
    }
}

function update_reservation_details_IPFS(nftURL, first, last, email){      //when user clicks to buy a reservation on sale, they must also update reservation details

    try {

        const response = await fetch(nftURL);

        const jsonObj = await response.json();

        //update res details - first name, last name, email and update sale status=false
        changeJSON(jsonObj, 'firstName', first);
        changeJSON(jsonObj, 'lastName', last);
        changeJSON(jsonObj, 'email', email);
        changeJSON(jsonObj, 'isSale', 'false');

        const pinata_metadata = {
            pinataMetadata: {
                keyvalues: jsonObj
            }
        };

        //write new JSON to IPFS
        const result = await pinata.pinJSONToIPFS(jsonObj, pinata_metadata);

        //delete old JSON on IPFS
        const get_old_ipfs_hash = nftURL.substring(nftURL.lastIndexOf('/')+1);
        const output = await pinata.unpin(get_old_ipfs_hash);

        return result.IpfsHash;     //returns hash of updated json
        
    } catch (err) {

        console.log('could not update sale status of nft:' + err);
    }
}