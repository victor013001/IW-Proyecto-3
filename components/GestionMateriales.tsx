import React from 'react'

const GestionMateriales = () => {
  return (
    <div className='border flex flex-row h-[100%]'>
      <div className='border w-[80%] flex flex-col justify-between items-center '>
        <div className='m-10'>
          <span className='text-normal text-5xl'>Gestión de Materiales</span>
        </div>
        <div className='border w-[100%] h-[100%] flex flex-col pl-24 pr-20'>
          <div className='p-6 m-6 flex flex-col justify-center items-center'>
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
                <tr>
                  <td>1</td>
                  <td>12/12/2021</td>
                  <td>Material 1</td>
                  <td>100</td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>12/12/2021</td>
                  <td>Material 2</td>
                  <td>100</td>
                </tr>
              </tbody>  
            </table>
          </div>
        </div>       
      </div>
    </div>  
  )
}

export default GestionMateriales

