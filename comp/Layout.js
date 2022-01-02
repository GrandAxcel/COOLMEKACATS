import Head from "./Head"
import Navbar from "./Navbar"

const Layout = ({ children }) => {
  return (
    <div id="background" className="content">
      <Head />
      <Navbar />
      {children}
    </div>
  )
}
export default Layout
