import { signOut } from 'next-auth/react';
import PrivateComponent from './PrivateComponent';
import { useUserData } from 'hooks/useUserData';
import Image from 'next/image';
import Link from 'next/link';

const Sidebar = () => {
  const { userData: data } = useUserData();
  const userImage = data?.user.image || '';
  return (
    <aside className='flex flex-col h-screen w-72 bg-color-sidebar justify-between'>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-centerrounded-full h-48 w-48 self-center items-stretch'>
          <Image
            src={userImage}
            alt='logo'
            width={200}
            height={100}
            quality={100}
            className='object-full rounded-full'
          />
        </div>
        <div className='flex justify-center'>
          <span className='text-white font-semibold text-xl'>
            {data?.user.name}
          </span>
        </div>
        <nav>
          <ul className='flex flex-col gap-2'>
            <Link href='/inventarios'>
              <li className='bg-buttom-sidebar m-4 p-4 rounded-lg font-semibold text-xl hover:cursor-pointer hover:bg-buttom-hover-sidebar'>
                Inventarios
              </li>
            </Link>
            <Link href='/materiales'>
              <li className='bg-buttom-sidebar m-4 p-4 rounded-lg font-semibold text-xl hover:cursor-pointer hover:bg-buttom-hover-sidebar'>
                Materiales
              </li>
            </Link>
            <PrivateComponent role='ADMIN'>
              <Link href='/usuarios'>
                <li className='bg-buttom-sidebar m-4 p-4 rounded-lg font-semibold text-xl hover:cursor-pointer hover:bg-buttom-hover-sidebar'>
                  Usuarios
                </li>
              </Link>
            </PrivateComponent>
          </ul>
        </nav>
      </div>
      <button
        className='m-4 p-2 rounded-lg font-semibold text-xl hover:cursor-pointer bg-buttom-logout-sidebar hover:bg-buttom-logout-hover-sidebar'
        type='button'
        onClick={() => signOut()}
      >
        Log out
      </button>
    </aside>
  );
};

export { Sidebar };
