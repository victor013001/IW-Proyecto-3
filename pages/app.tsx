import { useQuery } from '@apollo/client';
import { Header } from '@components/Header';
import { Sidebar } from '@components/Sidebar';
import { GET_USER } from 'graphql/client/user';
import { useUserData } from 'hooks/useUserData';
import { signIn, useSession } from 'next-auth/react';
import Head from 'next/head'
import { useRouter } from 'next/router';

const app = () => {
    const {status, loading, session}=useUserData();
    const router= useRouter();
    if (status === 'loading' || loading) return <div>Loading...</div>;
    if(!session){
     router.replace('/')
    }
  return (  
    <>    
    <body className='flex bg-white'>
        <Sidebar/>
    </body>
    </>  
  );
};

export default app;
