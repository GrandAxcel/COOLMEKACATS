import "tailwindcss/tailwind.css"
import Layout from "../comp/Layout"
import "../styles/style2.css"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
