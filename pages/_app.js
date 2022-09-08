import '../styles/globals.scss'
import Layout from '../component/Layout'
import Head from "next/head";
import store from '../store/store';
import { Provider } from "react-redux";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Head>
          <title>Italian Restaurant</title>
          <meta
            name="description"
            content="Great place to eat the italian food."
          />
          <link rel="icon" href="/img/logo.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp
