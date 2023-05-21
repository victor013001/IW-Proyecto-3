import { Header } from '@components/Header';
import Head from 'next/head'

const Home = () => {
  return (
    
  <>    
    <Head>
      <title>ConstruStock</title>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1'
      ></meta>
    </Head>
    <body>
      <Header/>
    </body>


    </>
  );
};

export default Home;
