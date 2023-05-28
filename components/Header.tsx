import { MdFacebook, MdWhatsapp } from 'react-icons/md';
import { SingIn } from './SingIn';

const Header = () => (
  <header className='flex  w-full'>
    <div className='flex  justify-between w-full mt-6'>
      <div className='mt-3 mr-24 mb-3 ml-10'>
        <span className='text-white font-bold text-4xl'>ConstruStock</span>
      </div>
      <div className='flex gap-9 mt-3 mr-24 mb-3'>
        <SingIn />
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
            href='https://wa.me'
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
