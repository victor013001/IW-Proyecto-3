import React from 'react';
import { useUsuarioContext } from '@context/usuarioContext';

const UsuarActionButtons = () => {
  const { setOpenModalUsuario } = useUsuarioContext();
  return (
    <div className='flex justify-center px-52 pt-2'>
      <div>
        <button type='button' onClick={() => setOpenModalUsuario(true)}>
          Editar usuario
        </button>
      </div>
    </div>
  );
};

export default UsuarActionButtons;
