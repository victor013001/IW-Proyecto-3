import { useQuery } from '@apollo/client';
import { GET_MATERIALS_BALANCE } from 'graphql/client/material';
import React, { useState } from 'react';
import { MaterialBalance } from 'types';
import { AgregarMaterial } from './AgregarMaterial';
import { ModalMateriales } from './modals/ModalMateriales';
import { Loading } from './Loading';
import PrivateComponent from './PrivateComponent';
import ReactPaginate from 'react-paginate';

const GestionMateriales = () => {
  const { data } = useQuery<{ materials: MaterialBalance[] }>(
    GET_MATERIALS_BALANCE,
    {
      fetchPolicy: 'network-only',
    }
  );

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 20; // Cantidad de elementos por página

  const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.materials.slice(startIndex, endIndex);

  if (!data?.materials || data.materials.length === 0) {
    return <Loading />;
  }

  return (
    <div className='flex h-full w-full flex-col p-4 gap-2'>
      <div className='flex h-full w-full flex-col gap-3'>
        <div className='flex justify-center pt-2'>
          <h1>Gestión de Materiales</h1>
        </div>
        <div className='flex justify-center pt-2'>
          <PrivateComponent role='ADMIN'>
            <AgregarMaterial />
            <ModalMateriales />
          </PrivateComponent>
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
                {paginatedData?.map((material) => (
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
        <div className='h-fit flex flex-row justify-center'>
            <ReactPaginate
              previousLabel={<span className='pagination-label'>Anterior</span>}
              nextLabel={<span className='pagination-label'>Siguiente</span>}
              breakLabel={'...'}
              pageCount={Math.ceil(data.materials.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={handlePageChange}
              containerClassName={'pagination-container'}
              pageClassName={'pagination-item'}
              pageLinkClassName={'pagination-link'}
              previousClassName={'pagination-item'}
              previousLinkClassName={'pagination-link'}
              nextClassName={'pagination-item'}
              nextLinkClassName={'pagination-link'}
              activeClassName={'active'}
            />
          </div>
      </div>
    </div>
  );
};

export {GestionMateriales};
