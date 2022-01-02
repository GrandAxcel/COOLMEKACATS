import Image from "next/image"
import Link from "next/link"
import Web3 from "web3"
import { useState, useEffect } from "react"

import { ADDRESS, ABI } from "../config.js"

const MAX_NFTs = 10

export default function Home() {
  const [signedIn, setSignedIn] = useState(false)

  const [walletAddress, setWalletAddress] = useState(null)

  // FOR MINTING
  const [how_many_NFTs, set_how_many_NFTs] = useState(1)

  const [nftContract, setnftContract] = useState(null)

  // INFO FROM SMART Contract

  const [totalSupply, setTotalSupply] = useState(0)

  const [saleStarted, setSaleStarted] = useState(false)

  const [claimed, setClaimed] = useState(false)

  const [NFTPrice, setNFTPrice] = useState(0)

  const [error, setError] = useState(null)

  //shorten wallet address
  const addy = walletAddress
    ? `0x..${walletAddress.substr(walletAddress.length - 4)}`
    : ""
  // console.log(addy)

  const price = NFTPrice * how_many_NFTs
  const cost = price / 10 ** 18
  const cost2 = (price - 10000000000000000) / 10 ** 18

  useEffect(async () => {
    signIn()
  }, [])

  async function signIn() {
    if (typeof window.web3 !== "undefined") {
      // Use existing gateway
      window.web3 = new Web3(window.ethereum)
    } else {
      alert("No Ethereum interface injected into browser. Read-only access")
    }

    window.ethereum
      .enable()
      .then(function (accounts) {
        window.web3.eth.net
          .getNetworkType()
          // checks if connected network is mainnet (change this to rinkeby if you wanna test on testnet)
          .then(network => {
            console.log(network)
            if (network != "main") {
              alert(
                "You are on " +
                  network +
                  " network. Change network to mainnet or you won't be able to do anything here"
              )
            }
          })
        let wallet = accounts[0]
        setWalletAddress(wallet)
        setSignedIn(true)
        callContractData(wallet)
      })
      .catch(function (error) {
        // Handle error. Likely the user rejected the login
        console.error(error)
      })
  }

  async function signOut() {
    setSignedIn(false)
  }

  async function callContractData(wallet) {
    const nftContract = new window.web3.eth.Contract(ABI, ADDRESS)
    setnftContract(nftContract)

    const salebool = await nftContract.methods.isActive().call()
    setSaleStarted(salebool)

    const totalSupply = await nftContract.methods.totalSupply().call()
    setTotalSupply(totalSupply)

    const NFTPrice = await nftContract.methods.PRICE().call()
    setNFTPrice(NFTPrice)

    const claimed = await nftContract.methods.claimed(wallet).call()
    setClaimed(claimed)
  }
  console.log(claimed)

  // async function cost(how_many_NFTs) {
  //   if (nftContract) {
  //     if (claimed == false) {
  //     } else {
  //       setNFTPrice(NFTPrice)
  //     }
  //   } else {
  //     // console.log("error")
  //   }
  // }
  // console.log(cost(how_many_NFTs))

  async function mint() {
    if (nftContract) {
      setError(null)

      let gasAmount
      try {
        gasAmount = await nftContract.methods
          .mint(how_many_NFTs)
          .estimateGas({ from: walletAddress, value: price })
      } catch (error) {
        setError(
          "There was an error while minting your Meka Cat. Please make sure you have enough ETH."
        )
        throw error
      }
      console.log("estimated gas", gasAmount)

      console.log({ from: walletAddress, value: price })

      try {
        nftContract.methods
          .mint(how_many_NFTs)
          .send({ from: walletAddress, value: price, gas: String(gasAmount) })
          .on("transactionHash", function (hash) {
            console.log("transactionHash", hash)
          })
      } catch (error) {
        setError(
          "There was an error while minting your Meka Cat. Please make sure you have enough ETH."
        )
      }
    } else {
      console.log("Wallet not connected")
    }
  }

  const onChangeHowManyNfts = e => {
    const num = e?.target?.value || 1
    set_how_many_NFTs(num <= MAX_NFTs ? (num > 0 ? num : 1) : MAX_NFTs)
  }

  return (
    // About
    <div className="flex flex-col items-center justify-center min-h-screen py-2 pt-20 ">
      <img src="/images/banner.png" width="1080" height="245" />
      <div className="md:w-2/3 w-4/5 border-white border-b-4 pb-6">
        <div className="flex flex-wrap lg:flex-nowrap justify-around items-center">
          <img className="lg:w-1/2 px-5" src="images/intro.gif" width="300" />
          <div className="lg:w-1/2 w-4/5">
            <h1 className=" text-5xl minecraft pt-4 text-gold ">
              Suit Up Pilot!
              <br />
            </h1>
            <p className="text-2xl text-white my-6 gameboy ">
              Somewhere far, far away,
              <span className="text-2xl text-gold font-bold">
                {" "}
                8888 MEKA CATS{" "}
              </span>{" "}
              are gearing up and getting ready to conquer the vast open
              Mekaverse!
            </p>
            {/* <p className="text-4xl text-gold my-6 font-black">SOLD OUT!</p> */}
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 ">
        <img src="/images/roadmap.png" />
      </div>

      <div id="mint" className="black-border w-full py-14"></div>
      <div id="mintbg">
        <div className=" min-h-screen py-2">
          {!signedIn ? (
            <button
              onClick={signIn}
              className="minecraft inline-block border-2 border-white rounded text-white py-2 px-2 mx-4 hover:text-yellow-500 transition-all hover:scale-110 "
            >
              Connect
            </button>
          ) : (
            <button
              onClick={signOut}
              className="minecraft inline-block border-2 border-white rounded text-white py-2 px-2 mx-4 hover:text-yellow-500 transition-all hover:scale-110"
            >
              {addy}
            </button>
          )}
          <div className="lg:w-2/3 w-full min-h-screen justify-center items-center ">
            <div className="mt-2 py-6 ">
              <div className="flex flex-col w-screen items-center">
                <div className="flex flex-wrap lg:flex-nowrap ">
                  {saleStarted ? (
                    <div className="lg:w-full w-screen ">
                      <span className="flex lg:flex-row flex-col gameboy md:text-4xl text-sm text-white items-center bg-grey-lighter rounded rounded-r-none px-4 my-4">
                        TOTAL MEKA CATS Deployed:{" "}
                        <span className="text-gold mx-4">
                          {" "}
                          {!signedIn ? <>-</> : <>{totalSupply}</>} / 8888
                        </span>
                      </span>
                      <div className="flex lg:flex-row flex-col justify-center items-center">
                        <img
                          className="lg:w-1/3 mx-6 "
                          src="images/mint.gif"
                          width="200"
                        />
                        <div className="flex flex-col justify-center items-center">
                          <span className="flex gameboy lg:text-2xl w-full text-white items-center justify-center py-4 font-bold">
                            HIRE MEKA CATS for {claimed ? cost : cost2} + GAS
                          </span>

                          <input
                            type="number"
                            min="1"
                            max={MAX_NFTs}
                            value={how_many_NFTs}
                            onChange={onChangeHowManyNfts}
                            name=""
                            className="gameboy w-24 text-2xl bg-grey-lighter py-2 px-2 font-normal rounded text-grey-darkest "
                          />
                          <div className="py-4 px-2">
                            <button
                              onClick={mint}
                              className="gameboy text-2xl bg-gold text-white hover:bg-yellow-600 py-2 px-2 rounded transition-all hover:scale-110 focus:scale-110"
                            >
                              HIRE!
                            </button>
                          </div>
                          <span className="flex gameboy lg:text-2xl w-full text-white items-center justify-center py-4 font-bold">
                            {" "}
                            First Mint per Wallet
                            <br />
                            is FREE!
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="items-center pt-20">
                      <p className="lg:text-6xl text-4xl text-gold minecraft pt-6 justify-center ">
                        Minting Starts: <br /> January 2, 2022 <br /> Stealth
                        Launch
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div id="team" className="mx-6 my-6 w-screen">
        <h2 className="text-5xl text-center minecraft text-gold my-2">
          The Team!
        </h2>
        <div className="flex justify-around flex-wrap px-3">
          <div className="flex flex-col my-6" style={{ width: "250" }}>
            <div className="cards-image-mask">
              <img
                src="/images/sarasaki.png"
                width="250"
                height="250"
                alt=""
                className="cards-image "
              />
            </div>
            <h3 className="my-2 text-center gameboy text-gold">Sarasaki</h3>
            <h3 className="my-2 text-center gameboy text-blue-400">
              Project Manager
            </h3>
          </div>
          <div className="flex flex-col  my-6 px-3" style={{ width: "250" }}>
            <div className="cards-image-mask">
              <img
                src="/images/nekozaddy.png"
                width="250"
                height="250"
                alt=""
                className="cards-image "
              />
            </div>
            <h3 className="my-2 text-center gameboy text-gold">NekoZaddy</h3>
            <h3 className="my-2 text-center gameboy text-blue-400">
              Lead Developer
            </h3>
          </div>
          <div className="flex flex-col  my-6 px-3" style={{ width: "250" }}>
            <div className="cards-image-mask ">
              <img
                src="/images/nyanswer.png"
                width="250"
                height="250"
                alt=""
                className="cards-image"
              />
            </div>
            <h3 className="my-2 text-center gameboy text-gold">The Nyanswer</h3>
            <h3 className="my-2 text-center gameboy text-blue-400">
              Lead Artist
            </h3>
          </div>
          <div className="flex flex-col  my-6 px-3" style={{ width: "250" }}>
            <div className="cards-image-mask ">
              <img
                src="/images/nekopapi.png"
                width="250"
                height="250"
                alt=""
                className="cards-image"
              />
            </div>
            <h3 className="my-2 text-center gameboy text-gold">Nekopapi</h3>
            <h3 className="my-2 text-center gameboy text-blue-400">
              Lead Marketing
            </h3>
          </div>
          <div className="flex flex-col my-6 px-3" style={{ width: "250" }}>
            <div className="cards-image-mask ">
              <img
                src="/images/nekokun.png"
                width="250"
                height="250"
                alt=""
                className="cards-image"
              />
            </div>
            <h3 className="my-2 text-center gameboy text-gold">Nekokun</h3>
            <h3 className="my-2 text-center gameboy text-blue-400">
              Community Manager
            </h3>
          </div>
        </div>
      </div> */}
    </div>
  )
}
