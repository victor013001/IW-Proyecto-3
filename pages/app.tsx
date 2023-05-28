import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head'
import { useRouter } from 'next/router';

const app = () => {
  const router= useRouter();
  const {data:session, status}=useSession();
  console.log('status', status);
  if (status === 'loading') return <div>Loading...</div>;
  if(!session){
   router.replace('/')
  }
  return (  
    <>    
    <body className='flex bg-white'>
        <Sidebar/>
        <main className='bg-white'>

        </main>
    </body>
    </>  
  );
};

export default app;
