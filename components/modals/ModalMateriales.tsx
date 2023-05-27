import { useMaterialsContext } from '@context/materialesContext';
import Modal from './Modal';
import React, { FormEvent, useState } from 'react'
import { useMutation} from '@apollo/client';
import { CREATE_MATERIAL } from 'graphql/client/material';
import { toast } from 'react-toastify';
import { create } from 'lodash';



const ModalMateriales = () => {

	const [formData, setFormData] = useState<{
		name: string;
		quantity: number;
	}>({
		name: '',
		quantity: 0,
	});

	const [createMaterial, {data, loading}] = useMutation(CREATE_MATERIAL);

	if (loading) return <div>Creando...</div>;
	

  	const {openModalMateriales, setOpenModalMateriales} = useMaterialsContext();

  	const submitForm = async (e:FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try{
			await createMaterial({
				variables: {
					name: formData.name,
					input: formData.quantity,
				},
			 });

			if (data?.data?.createMaterial === null){
				toast.warning('Ya existe un material con ese nombre');
				return;
			} 
			toast.success('Material creado exitosamente');
			setFormData({
				name: '',
				quantity: 0,
			});
			setOpenModalMateriales(false);	
		}catch(error){
			toast.error('Error al crear el material');
		}
	};

	

  return (
    <Modal
	open={openModalMateriales}
	setOpen={setOpenModalMateriales}
	modalTitle='Agregar nuevo material'>
        <div>
			{loading ? (
				<div>Creando...</div>
			): (
				<form onSubmit={submitForm} className='flex flex-col gap-3'>
				<label htmlFor='name' className='flex flex-col'>
					<span>Nombre</span>
					<input id='names'
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
						<button type='button' onClick={()=>setOpenModalMateriales(false)} className='secondary'>Cancelar</button>
						<button type='submit'>Crear</button>
				</div>
			</form>
			)}				
		</div>
    </Modal>
  )
}	

export {ModalMateriales}
