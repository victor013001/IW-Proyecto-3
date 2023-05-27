import { useQuery } from '@apollo/client';
import { GET_MATERIALS_BALANCE } from 'graphql/client/material';
import React from 'react'
import { MaterialBalance } from 'types';

const GestionMateriales = () => {

  const {setOpenModalMateriales} = useMaterialesContext();

  const {data, loading} =
  useQuery<{materials: MaterialBalance[]}>(GET_MATERIALS_BALANCE,
     {
      fetchPolicy:'network-only',
  });
  if (loading) return <div>Loading...</div>


  return (
    <div className='border flex flex-row h-[100%]'>
      <div className='border w-[80%] flex flex-col justify-between items-center '>
        <div className='m-10'>
          <h1>Gestión de Materiales</h1>
        </div>
        <button type='button' onClick={() => setOpenModalMateriales()}>Agregar material</button>
        <div className='h-full flex flex-col'>
          <div className='h-full flex justify-center p-6'>
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
                {data?.materials.map((material) => {
                  console.log(material)
                  return(
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
                  )
                })}
              </tbody>  
            </table>
          </div>
        </div>       
      </div>
    </div>  
  )
}

export default GestionMateriales

function useMaterialesContext(): { setOpenModalMateriales: any; } {
  throw new Error('Function not implemented.');
}

