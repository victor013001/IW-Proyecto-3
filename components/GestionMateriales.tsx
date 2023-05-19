import React from 'react'

const GestionMateriales = () => {
  return (
    <div className='border flex flex-row '>
      <div className='border w-[20%]'>
        <span>navbar</span>  
      </div>
      <div className='border w-[80%] flex flex-col justify-between items-center'>
        <div>
          <span className='text-normal text-5xl'>Gestión de Materiales</span>
        </div>
        <div className='border w-[100%] flex flex-col pl-24 pr-20'>
          <button>boton</button>
          <table>
            <thead>ola</thead>
            <tbody>
              <tr>
                <td>Identificación</td>
              </tr>
              <tr>
                <td>Fecha de Creación</td>
              </tr>
              <tr>Nombre</tr>
              <tr>Saldo</tr>
            </tbody>

          </table>
        </div>
        <div className='border h-[90px] flex flex-row justify-between w-[100%] pt-5 pl-24 pr-20'>
          <span>Universidad de Antioquia</span>
          <span>ConstruStock</span>
          <span>Integrantes</span>
          <span>Ingeniería Web</span>
        </div>       
      </div>
    </div>  
  )
}

export default GestionMateriales

