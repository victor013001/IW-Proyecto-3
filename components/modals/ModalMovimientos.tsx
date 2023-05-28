import React, { FormEvent, useState } from 'react';
import Modal from './Modal';
import { useMovivientosContext } from '@context/movimientosContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MATERIAL } from 'graphql/client/material';
import {
  CREATE_MOVEMENT,
  GET_MOVEMENTS_BY_NAME,
} from 'graphql/client/movements';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

interface Material {
  id: string;
  name: string;
}

const ModalMovimientos = () => {
  const [createMovement, { loading: MutationLoading }] =
    useMutation(CREATE_MOVEMENT);
  const { data, loading } = useQuery<{ material: Material[] }>(GET_MATERIAL);
  const { openModalMovimientos, setOpenModalMovimientos } =
    useMovivientosContext();
  const [formData, setFormData] = useState({
    materialType: '',
    movement: '',
    input: 0,
    output: 0,
  });

  const initialFormData = {
    materialType: '',
    movement: '',
    input: 0,
    output: 0,
  };

  const submitForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await createMovement({
        variables: {
          name: formData.materialType,
          input: formData.input,
          output: formData.output,
        },
        refetchQueries: [GET_MOVEMENTS_BY_NAME],
      });

      if (result.data?.createMovement == null) {
        toast.warning('No hay saldo suficiente en el material para crear el movimiento');
        return;
      }

      toast.success('Movimiento creado exitosamente');
      setOpenModalMovimientos(false);
      setFormData(initialFormData);
    } catch (e) {
      toast.error('Error al crear el movimiento');
    }
  };

  if (loading) return <div>Loading...</div>;

  let value = '';

  if (formData.movement === 'input') {
    value = formData.input.toString();
  } else if (formData.movement === 'output') {
    value = formData.output.toString();
  }

  return (
    <Modal
      open={openModalMovimientos}
      setOpen={setOpenModalMovimientos}
      modalTitle='Crear nuevo movimiento'
    >
      <div>
        <form onSubmit={submitForm} className='flex flex-col gap-3'>
          <label htmlFor='material' className='flex flex-col'>
            <span>Material</span>
            <select
              name='material'
              value={formData.materialType}
              required
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  materialType: e.target.value,
                }))
              }
            >
              <option disabled value={''}>
                Seleccione el tipo de material
              </option>
              {data?.material.map((materiales) => (
                <option
                  key={`material_${materiales.id}`}
                  value={materiales.name}
                >
                  {materiales.name}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor='movimiento' className='flex flex-col'>
            <span>Movimiento</span>
            <select
              name='movimiento'
              value={formData.movement}
              required
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, movement: e.target.value }))
              }
            >
              <option disabled value={''}>
                Seleccione el tipo de movimiento
              </option>
              <option value='input'>Entrada</option>
              <option value='output'>Salida</option>
            </select>
          </label>
          <label htmlFor='valor' className='flex flex-col'>
            <span>Valor para el tipo de movimiento</span>
            <input
              type='number'
              name='valor'
              min={1}
              step={1}
              required
              placeholder='0'
              value={value}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setFormData((prev) => {
                  if (formData.movement === 'input') {
                    return { ...prev, input: value };
                  } else if (formData.movement === 'output') {
                    return { ...prev, output: value };
                  } else {
                    return prev;
                  }
                });
              }}
            />
          </label>
          <div className='w-full flex justify-center gap-6'>
            <button type='submit' disabled={MutationLoading}>
              {MutationLoading ? (
                <ReactLoading
                  type='spin'
                  height={30}
                  width={30}
                  color='white'
                />
              ) : (
                'Crear'
              )}
            </button>
            <button
              type='button'
              onClick={() => setOpenModalMovimientos(false)}
              className='secondary'
            >
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export { ModalMovimientos };
