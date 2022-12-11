import '../styles/globals.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import StoreProvider from '../store/Store';

function MyApp({ Component, pageProps }) {
  return <StoreProvider>
    <Component {...pageProps} />
  </StoreProvider>
}

export default MyApp
