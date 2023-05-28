import { Sidebar } from '@components/Sidebar';
import React from 'react';

interface LayoutProps {
  children: JSX.Element;
}

const Layout = ({ children }: LayoutProps) => (
  <main className='flex min-h-screen w-full'>
    <Sidebar />
    <section className='w-full h-full flex'>{children}</section>
  </main>
);

export default Layout;
