import { useMaterialsContext } from '@context/materialesContext';
import React from 'react'

const AgregarMaterial = () => {
  const {setOpenModalMateriales} = useMaterialsContext();
  return (
    <div>
        <div>
            <button type='button' onClick={() => setOpenModalMateriales(true)}>Agregar Material</button>
        </div>
    </div>
  )
}

export  {AgregarMaterial}