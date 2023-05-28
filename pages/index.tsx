import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head'
import { useRouter } from 'next/router';

const Home = () => {
  const router= useRouter();
  const {data:session, status}=useSession();
  console.log('status', status);
  if (status === 'loading') return <div>Loading...</div>;
  if(session){
    router.push('/app')
  }
  return (  
    <div className='body-landing h-screen w-full'>
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
    </div> 
  );
};

export default Home;
