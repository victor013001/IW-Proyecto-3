import { signIn } from 'next-auth/react';

const Home = () => {
  const text = 'Proyecto 3';
  return (
    <div className='flex w-full h-screen flex-col gap-2 justify-center items-center'>
      {text}
      <div>
        <button onClick={() => signIn()} className='bg-indigo-400'>
          Iniciar Sesion
        </button>
      </div>
    </div>
  );
};

export default Home;
