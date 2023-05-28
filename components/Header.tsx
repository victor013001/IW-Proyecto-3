import { signIn } from 'next-auth/react';
import { MdFacebook, MdWhatsapp } from 'react-icons/md';

const Header = () => (
  <header className='flex  w-full'>
    <div className='flex  justify-between w-full mt-6'>
      <div className='mt-3 mr-24 mb-3 ml-10'>
        <span className='text-white font-bold text-4xl'>ConstruStock</span>
      </div>
      <div className='flex gap-9 mt-3 mr-24 mb-3'>
        <button
          onClick={() => signIn('auth0')}
          className='bg-color-background-buttom p-2  text-white font-semibold rounded-md hover:cursor-pointer hover:scale-105'
        >
          Iniciar Sesión
        </button>
        <div>
          <a
            href='https://www.facebook.com/'
            className='text-blue-600 text-4xl hover:cursor-pointer'
          >
            <MdFacebook />
          </a>
        </div>
        <div>
          <a
            href='https://wa.me/573214015015'
            className='text-green-600 text-4xl hover:cursor-pointer'
          >
            <MdWhatsapp />
          </a>
        </div>
      </div>
    </div>
  </header>
);

export { Header };
