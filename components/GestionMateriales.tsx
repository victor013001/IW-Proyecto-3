import { useQuery } from '@apollo/client';
import { GET_MATERIALS_BALANCE } from 'graphql/client/material';
import React from 'react';
import { MaterialBalance } from 'types';
import { AgregarMaterial } from './AgregarMaterial';
import { ModalMateriales } from './modals/ModalMateriales';
import { Loading } from './Loading';

const GestionMateriales = () => {

  const { data, loading } = useQuery<{ materials: MaterialBalance[] }>(
    GET_MATERIALS_BALANCE,
    {
      fetchPolicy: 'network-only',
    }
  );
  if (loading) return <Loading />;

  return (
    <div className='flex h-full w-full flex-col p-4 gap-2'>
      <div className='flex h-full w-full flex-col gap-3'>
        <div className='flex justify-center'>
          <h1>Gestión de Materiales</h1>
        </div>
        <div className='flex justify-between'>
          <AgregarMaterial />
          <ModalMateriales />
        </div>
        <div className='h-full flex flex-col'>
          <div className='h-[80vh] flex justify-center p-6 overflow-y-auto'>
            <table className='block'>
              <thead>
                <tr>
                  <th>Identificador</th>
                  <th>Fecha de Creación</th>
                  <th>Nombre</th>
                  <th>Saldo</th>
                </tr>
              </thead>
              <tbody>
                {data?.materials?.map((material) => (
                    <tr key={`row_${material.id}`}>
                      <td>
                        <div>{material.id}</div>
                      </td>
                      <td>
                        <div>{material.createdAt}</div>
                      </td>
                      <td>
                        <div>{material.name}</div>
                      </td>
                      <td>
                        <div>{material.balance}</div>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GestionMateriales;
