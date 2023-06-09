import { useMaterialsContext } from '@context/materialesContext';
import Modal from './Modal';
import React, { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import {
  CREATE_MATERIAL,
  GET_MATERIALS_BALANCE,
} from 'graphql/client/material';
import { toast } from 'react-toastify';

const ModalMateriales = () => {
  const [formData, setFormData] = useState<{
    name: string;
    quantity: number;
  }>({
    name: '',
    quantity: 0,
  });

  const [createMaterial, { loading }] = useMutation(CREATE_MATERIAL);
  const { openModalMateriales, setOpenModalMateriales } = useMaterialsContext();

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const result = await createMaterial({
        variables: {
          name: formData.name,
          input: formData.quantity,
        },
        refetchQueries: [GET_MATERIALS_BALANCE],
      });

      if (result.data?.createMaterial == null) {
        toast.warning('Ya existe un material con ese nombre');
        return;
      } else {
        toast.success('Material creado exitosamente');
        setOpenModalMateriales(false);
        setFormData({
          name: '',
          quantity: 0,
        });
      }
    } catch (error) {
      toast.error('Error al crear el material');
    }
  };

  return (
    <Modal
      open={openModalMateriales}
      setOpen={setOpenModalMateriales}
      modalTitle='Agregar nuevo material'
    >
      <div>
        {loading ? (
          <div>Creando...</div>
        ) : (
          <form onSubmit={submitForm} className='flex flex-col gap-3'>
            <label htmlFor='name' className='flex flex-col'>
              <span>Nombre</span>
              <input
                id='names'
                required
                type='text'
                name='names'
                value={formData.name.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    name: e.target.value,
                  }))
                }
              />
            </label>
            <label htmlFor='balance' className='flex flex-col'>
              <span>Cantidad</span>
              <input
                type='number'
                required
                name='balance'
                min={1}
                step={1}
                placeholder='0'
                value={formData.quantity.toString()}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    quantity: parseInt(e.target.value),
                  }))
                }
              />
            </label>
            <div className='w-full flex justify-center gap-6'>
              <button type='submit'>Crear</button>
              <button
                type='button'
                onClick={() => setOpenModalMateriales(false)}
                className='secondary'
              >
                Cancelar
              </button>
            </div>
          </form>
        )}
      </div>
    </Modal>
  );
};

export { ModalMateriales };
