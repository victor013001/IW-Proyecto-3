import { useQuery } from '@apollo/client'
import ActionButtons from '@components/ActionButtons'
import PrivateRoute from '@components/PrivateRoute'
import { ModalMovimientos } from '@components/modals/ModalMovimientos'
import { MovimientosContextProvider } from '@context/movimientosContext'
import Layout from '@layouts/Layout'
import { GET_MOVEMENTS_BY_NAME } from 'graphql/client/movements'
import Head from 'next/head'
import { Id } from 'react-toastify'
import { ExtendedMovement } from 'types'
import { GET_MATERIAL } from 'graphql/client/material'
import React, { useState } from 'react'
import ReactLoading from 'react-loading'


const inventarios = () => {
  return (
		<PrivateRoute>
			<Head>
				<title>Create Next App</title>
				<meta name='description' content='Generated by create next app' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<Layout>
				<MovimientosContextProvider>
					<InventariosMovimientos/>
				</MovimientosContextProvider>
			</Layout>
    </PrivateRoute>
    
  );
};

interface Material{
	id: string
  name: string
};

const InventariosMovimientos = () => {
	const [selectedMaterial, setSelectedMaterial] = useState<string>('Tornillos autoperforantes');
  const {data,loading} = useQuery<{material:Material[]}>(GET_MATERIAL);
  return (
    <div className='flex h-full w-full flex-col p-4 gap-2'>
      <div className='flex justify-center'>
        <h1>Gestión de inventarios</h1> 
      </div>
    	<div className='flex justify-between'>
				<div className="w-64">
					<label htmlFor = 'material'>
						<span>Material</span>
						<select name='material'className="w-full p-2.5 text-gray-800 bg-white border border-gray-300 rounded-md shadow-sm outline-none focus:border-green-hover" value={selectedMaterial} onChange={(e)=>setSelectedMaterial(e.target.value)}>
							<option disabled>Seleccionar material</option>
							{data?.material.map((materiales) => (
								<option key={`material_${materiales.id}_${materiales.name}`} value={materiales.name}>{materiales.name}</option>
							))}
						</select> 
					</label>
				</div>
        <ActionButtons/>
      </div> 
      <InventariosTable name={selectedMaterial}/>
			<div className=''>Footer</div>
			<ModalMovimientos/> 
    </div>
 	);
};

export default inventarios;

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
  
	if (loading) return (
		<div className='w-full h-screen flex flex-col gap-4 items-center justify-center'>
			<h1 className=''>Loading...</h1>
			<ReactLoading type='spinningBubbles' height={80} width={80} color='green'/>
		</div>
	);
	

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
            {data?.movements.map((dato) => {
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
          <div className=''>Paginacion</div> 
        </div>
  );
};