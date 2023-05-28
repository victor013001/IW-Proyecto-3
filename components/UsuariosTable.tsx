import { useQuery } from '@apollo/client';
import { GET_USERS } from 'graphql/client/user';
import React, { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { ExtendedUser } from 'types';
import { Loading } from './Loading';

const UsuariosTable = () => {
  const { data } = useQuery<{ users: ExtendedUser[] }>(GET_USERS);

  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 25; // Cantidad de elementos por página

  const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = data?.users.slice(startIndex, endIndex);

  if (!data?.users || data.users.length === 0) {
    return <Loading />;
  }

  return (
    <div className='h-full flex flex-col gap-3 pt-2'>
      <div className='h-[70vh] flex justify-center overflow-y-auto'>
        <table className='block'>
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Fecha</th>
              <th>Correo</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((dato) => (
              <tr key={`row_${dato.id}`}>
                <td>
                  <div>{dato.id}</div>
                </td>
                <td>
                  <div>{dato.createdAt.toString()}</div>
                </td>
                <td>
                  <div>{dato.email}</div>
                </td>
                <td>
                  <div>{dato.role?.name}</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='h-fit flex flex-row justify-center'>
        <ReactPaginate
          previousLabel={<span className='pagination-label'>Anterior</span>}
          nextLabel={<span className='pagination-label'>Siguiente</span>}
          breakLabel={'...'}
          pageCount={Math.ceil(data.users.length / itemsPerPage)}
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
  );
};

export { UsuariosTable };
