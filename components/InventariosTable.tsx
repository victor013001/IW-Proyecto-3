import { useQuery } from '@apollo/client';
import { GET_MOVEMENTS_BY_NAME } from 'graphql/client/movements';
import React, { useState } from 'react'
import ReactLoading from 'react-loading';
import ReactPaginate from 'react-paginate';
import { ExtendedMovement } from 'types';

interface InventariosTableProps {
	name: string;
}

const InventariosTable = ({name}:InventariosTableProps)=>{
    const {data,loading} = useQuery<{movements:ExtendedMovement[]}>(GET_MOVEMENTS_BY_NAME, {
		variables: {
			name
		},
		fetchPolicy: 'cache-first'
	});
  
	

	const [currentPage, setCurrentPage] = useState(0);
	const itemsPerPage = 25; // Cantidad de elementos por página

	const handlePageChange = (selected: { selected: number }) => {
    setCurrentPage(selected.selected);
  };

	const startIndex = currentPage * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	const paginatedData = data?.movements.slice(startIndex, endIndex);
	
	if (!data?.movements || data.movements.length === 0) {
    return (
      <div className='h-full flex justify-center items-center'>
        <p>Loading...</p>
        <ReactLoading type='spin' height={30} width={30} color='green'/>
      </div>
    );
  }

	return (
    <div className='h-full flex flex-col'>
      <div className='h-[80vh] flex justify-center p-6 overflow-y-auto'>
        <table className='block'>
          <thead>
            <tr>
              <th>Identificador</th>
              <th>Fecha</th>
              <th>Entrada</th>
              <th>Salida</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData?.map((dato) => {
              return(
                <tr key={`row_${dato.id}_${dato.materialId}`}>
                  <td>
                    <div>{dato.id}</div>  
                  </td>
                  <td>
                    <div>{dato.createdAt.toString()}</div> 
                  </td>
                  <td>
                    <div>{dato.input}</div> 
                  </td>
                  <td>
                    <div>{dato.output}</div>
                  </td>      
                </tr>
              )
            })}
          </tbody>
        </table>
			</div>
			<div className='flex flex-row justify-center'>
				<ReactPaginate
				previousLabel={<span className="pagination-label">Anterior</span>}
				nextLabel={<span className="pagination-label">Siguiente</span>}
				breakLabel={'...'}
				pageCount={Math.ceil(data.movements.length / itemsPerPage)}
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
}

export {InventariosTable}