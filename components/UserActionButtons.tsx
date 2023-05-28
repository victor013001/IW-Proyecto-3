import React from 'react';
import { useUsuarioContext } from '@context/usuarioContext';

const UsuarActionButtons = () => {
  const { setOpenModalUsuario } = useUsuarioContext();
  return (
    <div className='flex justify-end px-52'>
      <div>
        <button type='button' onClick={() => setOpenModalUsuario(true)}>
          Editar usuario
        </button>
      </div>
    </div>
  );
};

export default UsuarActionButtons;
