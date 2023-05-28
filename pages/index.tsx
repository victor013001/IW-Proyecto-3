import { Header } from '@components/Header';
import { Loading } from '@components/Loading';
import { useSession } from 'next-auth/react';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Home = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  if (status === 'loading') return <Loading />;
  if (session) {
    router.push('/inventarios');
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
        <Header />
      </body>
    </div>
  );
};

export default Home;
