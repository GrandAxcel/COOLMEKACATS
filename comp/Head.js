import React from "react"
import Head from "next/head"

export default function Header() {
  return (
    <div>
      <Head>
        <title>COOL MEKA CATS</title>
        <link rel="icon" href="/images/logo.png" />
        <meta property="og:title" content="COOL MEKA CATS" key="ogtitle" />
        <meta property="og:description" content="" key="ogdesc" />
        <meta property="og:type" content="website" key="ogtype" />
        <meta
          property="og:url"
          content="https://www.coolmekacats.io/"
          key="ogurl"
        />
        <meta
          property="og:image"
          content="https://www.coolmekacats.io/images/logo.png"
          key="ogimage"
        />
        <meta
          property="og:site_name"
          content="https://www.coolmekacats.io/"
          key="ogsitename"
        />

        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta
          property="twitter:domain"
          content="coolmekacats.io"
          key="twdomain"
        />
        <meta
          property="twitter:url"
          content="https://twitter.com/coolmekacats"
          key="twurl"
        />
        <meta name="twitter:title" content="COOL MEKA CATS" key="twtitle" />
        <meta name="twitter:description" content="" key="twdesc" />
        <meta
          name="twitter:image"
          content="https://www.coolmekacats.io/images/logo.png"
          key="twimage"
        />
      </Head>
    </div>
  )
}
