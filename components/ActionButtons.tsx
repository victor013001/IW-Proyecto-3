import React from 'react';
import { useMovivientosContext } from '@context/movimientosContext';

const ActionButtons = () => {
  const { setOpenModalMovimientos } = useMovivientosContext();
  return (
    <div className='flex py-6'>
        <div>
            <button type='button' onClick={() => setOpenModalMovimientos(true)}>Agregar movimiento</button>
        </div>
        
    </div>
  );
};

export default ActionButtons;
