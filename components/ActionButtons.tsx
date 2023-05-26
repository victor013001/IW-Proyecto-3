import React, { useState } from 'react'
import Modal from './modals/Modal';
import { ModalMovimientos } from './modals/ModalMovimientos';
import { useMovivientosContext } from '@context/movimientosContext';

const ActionButtons = () => {
  const {setOpenModalMovimientos} = useMovivientosContext();
  return (
    <div>
        <div>
            <button type='button' onClick={() => setOpenModalMovimientos(true)}>Agregar movimiento</button>
        </div>
        
    </div>
  )
}

export default ActionButtons