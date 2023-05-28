import { signOut } from 'next-auth/react';
import PrivateComponent from './PrivateComponent';
import { useUserData } from 'hooks/useUserData';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Sidebar = () => {
  const { userData: data } = useUserData();
  const userImage = data?.user.image || '';
  return (
    <aside className='flex flex-col min-h-screen w-72 bg-color-sidebar justify-between'>
      <div className='flex flex-col gap-2'>
        <div className='flex justify-centerrounded-full h-48 w-48 self-center items-stretch pt-6'>
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
        <nav className='pt-4'>
          <ul className='flex flex-col gap-2'>
            <SidebarLink href='/inventarios' title='Inventarios' />
            <SidebarLink href='/materiales' title='Materiales' />
            <PrivateComponent role='ADMIN'>
              <SidebarLink href='/usuarios' title='Usuarios' />
            </PrivateComponent>
          </ul>
        </nav>
      </div>
      <button
        className='m-4 p-2 rounded-lg font-semibold text-xl hover:cursor-pointer'
        type='button'
        onClick={() => signOut()}
      >
        Log out
      </button>
    </aside>
  );
};
interface SidebarLinkProps {
  href: string;
  title: string;
}

const SidebarLink = ({ href, title }: SidebarLinkProps) => {
  const router = useRouter();

  const isActive = router.pathname === href;

  return (
    <Link href={href}>
      <li className={isActive ? 'active' : 'non-active'}>{title}</li>
    </Link>
  );
};

export { Sidebar };
