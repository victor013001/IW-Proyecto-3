import React from 'react'

const GestionMateriales = () => {
  return (
    <div className='border flex flex-row h-[100%]'>
      <div className='border w-[80%] flex flex-col justify-between items-center '>
        <div className='m-10'>
          <h1>Gestión de Materiales</h1>
        </div>
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

