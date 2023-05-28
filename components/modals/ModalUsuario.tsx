import React, { FormEvent, useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import Modal from './Modal';
import { useUsuarioContext } from '@context/usuarioContext';
import { UPSERT_USER, GET_USERS, GET_USER } from 'graphql/client/user';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

interface User {
  id: string;
  createdAt: string;
  email: string;
  role: {
    name: string;
  }
}

const ModalUsuario = () => {
  const [editUser, { loading: MutationLoading }] = useMutation(UPSERT_USER);
  const { data, loading } = useQuery<{ users:User[]}>(GET_USERS);
  const { openModalUsuario, setOpenModalUsuario } = useUsuarioContext();
  const [formData, setFormData] = useState({
    email: '',
    roleName: '',
  });

  const initialFormData = {
    email: '',
    roleName: '',
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await editUser({
        variables: {
          email: formData.email,
          roleName: formData.roleName,
        },
        refetchQueries: [GET_USER],
      });
      toast.success('Usuario editado exitosamente');
      setOpenModalUsuario(false);
      setFormData(initialFormData);
    } catch (error) {
      toast.error('Error al editar el usuario');
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Modal
      open={openModalUsuario}
      setOpen={setOpenModalUsuario}
      modalTitle='Editar Usuario'
    >
      <div>
        <form onSubmit={submitForm} className='flex flex-col gap-3'>
          <label htmlFor='email' className='flex flex-col'>
            <span>Usuario</span>
            <select name='email' value={formData.email} onChange={(e)=>setFormData((prev)=>({...prev, email:e.target.value}))}>
              <option disabled value=''>
                Seleccione un usuario
              </option>
              {data?.users.map((user) => (
                <option key={`usuario_${user.email}`} value={user.email}>
                  {user.email}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor='rol' className='flex flex-col'>
            <span>Rol</span>
            <select name='rol' defaultValue={formData.roleName}
            onChange={(e)=>setFormData((prev)=>({...prev, roleName:e.target.value}))}>
              <option disabled value=''>
                Seleccione un rol
              </option>
              <option value='ADMIN'>ADMIN</option>
              <option value='USER'>USER</option>
            </select>
          </label>
          <div className='w-full flex justify-center gap-6'>
          <button type='submit' disabled={MutationLoading}>
						{MutationLoading ? <ReactLoading type='spin' height={30} width={30} color='white'/> : 'Aceptar'}
					</button>
					<button type='button' onClick={()=>setOpenModalUsuario(false)} className='secondary'>Descartar</button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export { ModalUsuario };
