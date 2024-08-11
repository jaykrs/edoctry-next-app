// pages/_app.js
/* styles/globals.css */
 import 'bootstrap/dist/css/bootstrap.min.css'; 
import "./index.css";
import { Provider } from 'react-redux';
import store from '../store';
import { useEffect } from 'react';
function MyApp({ Component, pageProps }) {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
