// pages/_app.js

import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap's CSS
//import '../styles/globals.css'; // Optional: Your global CSS file

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
