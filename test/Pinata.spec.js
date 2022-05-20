const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.pinataApiKey, process.env.pinataSecretApiKey);
import React from 'react';

//test Pinata connection
// pinata.testAuthentication().then((result) => {
//     console.log(result.authenticated);
// }).catch((err) => {
//     console.log(err);
// });



//---------------------------------------WRITE to IPFS------------------------------------------------
//let ipfs_hash = '';

// (async function() {

//     let checkoutDate = new Date('may 18 2022');
//     checkoutDate = checkoutDate.toISOString();      //inorder to query on date values they must be ISO_8601 format

//     const nft_metadata = {
//         firstName: '4',
//         lastName: '4',
//         email: '4',
//         hotelName: '4',
//         checkInDate: '4',       
//         checkOutDate: checkoutDate,  
//         roomType: '4',
//         image: 'https://gateway.pinata.cloud/ipfs/QmVXTa57AAeEzLpxLfV2RGcPGa46UxxaRNy1KQcH71btfM',
//         isSale: 'false'
//     };

//     const pinata_metadata = {           //pinned data can only be queried on pinata metadata therefore doing this
//         pinataMetadata: {
//             keyvalues: {
//                 firstName: '4',
//                 lastName: '4',
//                 email: '4',
//                 hotelName: '4',
//                 checkInDate: '4',       
//                 checkOutDate: checkoutDate,  
//                 roomType: '4',
//                 image: 'https://gateway.pinata.cloud/ipfs/QmVXTa57AAeEzLpxLfV2RGcPGa46UxxaRNy1KQcH71btfM',
//                 isSale: 'false'
//             }
//         }
//   };

//     try {
//         const result = await pinata.pinJSONToIPFS(nft_metadata, pinata_metadata);

//         ipfs_hash = result.IpfsHash;

//         console.log("Content pinned successfully. IPFS hash is: ", ipfs_hash);
//         //console.log("Content pinned successfully", result.ipfsHash);
//     } catch (err) {
//         console.error("Content was not pinned", err);
//     }
// })();


//------------------------------GET specific NFT using ipfs hash---------------------------------
// function getMetaData() {

//     const [data, setData] = React.useState(null);
//     const [isLoading, setLoading] = React.useState(false);

//     //const nftURL = hotel42NftContract.tokenURI('token ID associated to wallet address');
//     const nftURL = 'https://gateway.pinata.cloud/ipfs/QmcbtUPgWa6DnURw5WZ2nzraoRAKVK1AAyFQ8KwdfWTvHU';
  
//     useEffect(() => {
//       setLoading(true)
//       fetch(nftURL)
//       .then((res) => res.json())
//       .then((data) => {
//         setData(data)
//         setLoading(false)
//       })
//   }, [])

//     return ();
// }
