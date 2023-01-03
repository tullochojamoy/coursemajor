import './Home.css';
import './404.css';
import './About-Us.css';
import './nicepage.css';
import './Footer.css';
import './Admin-User-Edit.css';
import './Course-Create.css';
import './Course-Sold.css';
import './Course-Statistics.css';
import './Course-Preview.css';
import './Create-Course-Funnel.css';
import './Forgot-Password.css';
import './Login.css';
import './My-Courses.css';
import './Password-Reset.css';
import './Playlist.css';
import './Playlist-Create.css';
import './Privacy-Policy.css';
import './Purchase-History.css';
import './Register.css';
import './Search.css';

import '../components/Progress.css';
import '../components/common/searchInput/searchInput.css';
import '../components/custom/header/header.css';
import '../components/custom/headerMenu/headerMenu.css';

import '../pages/profile/Close-Account.css'
import '../pages/profile/Edit-Profile.css';
import '../pages/profile/Notifications.css';
import '../pages/profile/ProfileHeader.css';
import '../pages/profile/Social-Links.css';
import '../pages/profile/PayPal.css';
import '../pages/profile/index.css'

import Layout from '../components/Layout';

import store from '../redux/store';
import { Provider } from 'react-redux';
//import store from '../redux/store';

function MyApp({ Component, pageProps }) {
  return(
    <Provider store={store}> 
      <Layout>
        <Component {...pageProps} />
      </Layout>
	  </Provider>
  )
}

export default MyApp
