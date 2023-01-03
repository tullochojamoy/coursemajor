import Footer from '../pages/Footer';
import Meta from '../components/Meta';
import Header from '../components/custom/header'

const Layout = ({ children }) => {
  return (
    <div>
        <Meta />
        <Header/>
        {children}
        <Footer/>
    </div>
  )
}

export default Layout;