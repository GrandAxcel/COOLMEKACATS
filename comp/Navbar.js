import React from "react"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="flex flex-row items-center justify-between px-4 pb-6 bg-black ">
      <div className="w-full">
        <Link href="/">
          <img
            src="images/logo.png"
            width="69"
            className="py-2 transition-all hover:scale-110"
          />
        </Link>
      </div>
      <Link href="/#mint">
        <button className="gameboy border-2 border-white rounded text-white m-6 px-4 py-2 hover:text-yellow-500 transition-all hover:scale-110 ">
          Hire!
        </button>
      </Link>
      <Link href="https://twitter.com/coolmekacats">
        <img
          src="/images/twitter.png"
          className="m-6 px-4 py-2 transition-all hover:scale-110"
          width="60"
        ></img>
      </Link>
      {/* <Link href="https://discord.gg/">
        <img
          src="/images/discord.png"
          className="m-6 px-4 py-2 transition-all hover:scale-110"
          width="60"
        ></img>
      </Link> */}
    </nav>
  )
}
