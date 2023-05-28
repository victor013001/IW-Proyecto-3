import React, { FormEvent } from 'react';
import Modal from './Modal';
import { useUsuarioContext } from '@context/usuarioContext';

import { data } from 'utils/data'

const ModalUsuario = () => {
  const datos = data;
  const { openModalUsuario, setOpenModalUsuario } = useUsuarioContext();

  const submitForm = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <Modal
      open={openModalUsuario}
      setOpen={setOpenModalUsuario}
      modalTitle='Editar Usuario'
    >
      <div>
        <form onSubmit={submitForm} className='flex flex-col gap-3'>
          <label htmlFor='movimiento' className='flex flex-col'>
            <span>Usuario</span>
            <select name='movimiento' defaultValue={'None'}>
              <option disabled value='None'>
                Seleccione un usuario
              </option>
              {datos.map((dato) => {
                return (
                    <option value="`row_${dato.Identificador}`">{dato.Correo}</option>
                );
              })}
            </select>
          </label>
          <label htmlFor='movimiento' className='flex flex-col'>
            <span>Rol</span>
            <select name='movimiento' defaultValue={'None'}>
              <option disabled value='None'>
                Seleccione un rol
              </option>
              <option value='Entrada'>ADMIN</option>
              <option value='Salida'>USER</option>
            </select>
          </label>
          <div className='w-full flex justify-center gap-6'>
            <button type='button'>Aceptar</button>
            <button
              type='button'
              onClick={() => setOpenModalUsuario(false)}
              className='secondary'
            >
              Descartar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export { ModalUsuario };
