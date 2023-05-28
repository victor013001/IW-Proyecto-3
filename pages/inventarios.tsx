import { useQuery } from '@apollo/client';
import ActionButtons from '@components/ActionButtons';
import PrivateRoute from '@components/PrivateRoute';
import { ModalMovimientos } from '@components/modals/ModalMovimientos';
import { MovimientosContextProvider } from '@context/movimientosContext';
import Layout from '@layouts/Layout';
import Head from 'next/head';
import { GET_MATERIAL } from 'graphql/client/material';
import React, { useState } from 'react';
import { InventariosTable } from '@components/InventariosTable';

const inventarios = () => (
  <PrivateRoute>
    <Head>
      <title>Inventarios</title>
      <meta name='description' content='Generated by create next app' />
      <meta name='viewport' content='width=device-width, initial-scale=1' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
    <Layout>
      <MovimientosContextProvider>
        <InventariosMovimientos />
      </MovimientosContextProvider>
    </Layout>
  </PrivateRoute>
);

interface Material {
  id: string;
  name: string;
}

const InventariosMovimientos = () => {
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const { data } = useQuery<{ material: Material[] }>(GET_MATERIAL);
  return (
    <div className='flex w-full flex-col gap-3'>
      <div className='flex w-full justify-center'>
        <h1>Gestión de inventarios</h1>
      </div>
      <div className='flex justify-center gap-20'>
        <div className='w-64'>
          <label htmlFor='material'>
            <span>Material</span>
            <select
              name='material'
              className='w-full text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm outline-none focus:border-green-hover'
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value)}
            >
              <option disabled value={''}>
                Seleccionar material
              </option>
              {data?.material.map((materiales) => (
                <option
                  key={`material_${materiales.id}_${materiales.name}`}
                  value={materiales.name}
                >
                  {materiales.name}
                </option>
              ))}
            </select>
          </label>
        </div>
        <ActionButtons />
      </div>
      <InventariosTable name={selectedMaterial} />
      <ModalMovimientos />
    </div>
  );
};

export default inventarios;
