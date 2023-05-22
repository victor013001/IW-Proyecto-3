import { Sidebar } from '@components/Sidebar';
import { signIn } from 'next-auth/react';
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
    <body className='flex'>
        <Sidebar/>
    </body>
  
    </>
    
  );
};

export default Home;
