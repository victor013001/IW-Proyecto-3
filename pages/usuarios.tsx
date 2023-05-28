import UserActionButtons from '@components/UserActionButtons';
import PrivateRoute from '@components/PrivateRoute';
import { ModalUsuario } from '@components/modals/ModalUsuario';
import { UsuarioContextProvider } from '@context/usuarioContext';
import Layout from '@layouts/Layout';
import Head from 'next/head';
import React from 'react';
import { data } from 'utils/data';
import { UsuariosTable } from '@components/UsuariosTable';

const usuarios = () => {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Layout>
        <UsuarioContextProvider>
          <ListaUsuario />
        </UsuarioContextProvider>
      </Layout>
    </>
  );
};

const ListaUsuario = () => {
  return (
    <div className='flex w-full flex-col gap-3'>
      <div className='flex w-full justify-center'>
        <h1>Gestión de usuarios</h1>
      </div>
        <UserActionButtons />
        <UsuariosTable />
        <ModalUsuario />
    </div>
  );
};

export default usuarios;

const UsersTable = () => {
  const datos = data;
  return (
    <div className='h-full flex flex-col'>
      <div className='h-[80vh] flex justify-center p-6 overflow-y-auto'></div>
      <div className=''>Paginacion</div>
    </div>
  );
};
