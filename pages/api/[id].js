import { INFURA_ADDRESS, ADDRESS, ABI } from "../../config.js"
import Web3 from "web3"

import traits from "../../database/finaltraits.json"

//const fetch = require('node-fetch');

const infuraAddress = INFURA_ADDRESS

const projectApi = async (req, res) => {
  // SOME WEB3 STUFF TO CONNECT TO SMART CONTRACT
  const provider = new Web3.providers.HttpProvider(infuraAddress)
  const web3infura = new Web3(provider)
  const nftContract = new web3infura.eth.Contract(ABI, ADDRESS)

  //let traits

  // try {
  //   const apiResponse = await fetch("")
  //   traits = await apiResponse.json()
  //   console.log(traits)
  // } catch (err) {
  //   console.log(err)
  //   res.json({ error: "Something went wrong" })
  // }

  // IF YOU ARE USING INSTA REVEAL MODEL, USE THIS TO GET HOW MANY NFTS ARE MINTED
  const totalSupply = await nftContract.methods.totalSupply().call()
  console.log(totalSupply)

  // THE ID YOU ASKED IN THE URL
  const query = req.query.id

  // IF YOU ARE USING INSTA REVEAL MODEL, UNCOMMENT THIS AND COMMENT THE TWO LINES BELOW
  if (parseInt(query) < totalSupply) {
    const totalNFT = 8888

    // IF YOU ARE NOT USING CUSTOM NAMES, JUST USE THIS
    let tokenName = `#${query}`

    const trait = traits[parseInt(query)]

    //CHECK OPENSEA METADATA STANDARD DOCUMENTATION https://docs.opensea.io/docs/metadata-standards
    let metadata = {
      name: tokenName,
      description:
        "COOL MEKA CATS is a collective of 8,888 Meka Cats who have launched into battle beyond the blockchain and have now found their way into the metaverse. Aiming for the moon and shooting for the stars, each and every single Meka Cats is randomly generated from a combination of individually drawn traits, including traits inspired from our team’s favourite shows games, and characters. From watching Gundam to playing various pixel graphic games in our young days, COOL MEKA CATS is here to stay as we blast off on this everlasting adventure!",
      tokenId: parseInt(query),
      // image: `https://gateway.pinata.cloud/ipfs/${trait["imageIPFS"]}`,
      image: `https://gateway.pinata.cloud/ipfs/QmREUaaY1UbyatUuiCBxwaB4mxVhw2W5bUPZNgoZR2J52q`, //urevealed
      external_url: "https://www.coolmekacats.io/",
      attributes: [
        {
          trait_type: "Background",
          value: trait["Background"],
        },
        {
          trait_type: "Body",
          value: trait["Body"],
        },
        {
          trait_type: "Headgear",
          value: trait["Headgear"],
        },
        {
          trait_type: "Armor",
          value: trait["Armor"],
        },
        {
          trait_type: "Shoulder",
          value: trait["Shoulder"],
        },
        {
          trait_type: "Mouth",
          value: trait["Mouth"],
        },
        {
          trait_type: "Eyes",
          value: trait["Eyes"],
        },
      ],
    }

    res.statusCode = 200
    res.json(metadata)
  } else {
    res.statuscode = 404
    res.json({ error: "The pilot you requested is out of range" })
  }
}

export default projectApi
