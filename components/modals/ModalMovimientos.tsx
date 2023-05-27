import React, { FormEvent, useState } from 'react'
import Modal from './Modal'
import { useMovivientosContext } from '@context/movimientosContext';
import { useMutation, useQuery } from '@apollo/client';
import { GET_MATERIAL } from 'graphql/client/material';
import { CREATE_MOVEMENT } from 'graphql/client/movements';
import ReactLoading from 'react-loading';
import { toast } from 'react-toastify';

interface Material{
	id: string
  name: string
}

const ModalMovimientos = () => {
	const [createMovement, { loading: MutationLoading }] = useMutation(CREATE_MOVEMENT);
	const {data,loading} = useQuery<{material:Material[]}>(GET_MATERIAL);
	const {openModalMovimientos, setOpenModalMovimientos} = useMovivientosContext();
	const [formData, setFormData] = useState({
		materialType: '',
		movement: '',
		input: 0,
		output: 0,
	});

  const submitForm = async (e:FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try{
			const result = await createMovement({
				variables: {
					name: formData.materialType,
					input: formData.input,
					output: formData.output
				}

			});
			toast.success('Movimiento creado exitosamente')
			console.log(result);	
		}catch (e){
			console.error(e);
			toast.error('Error al crear el movimiento')
		}
		
		
	};

	if (loading) return <div>Loading...</div>

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
						<select name='material' value={formData.materialType} onChange={(e)=>setFormData((prev)=>({...prev, materialType:e.target.value}))}>
							<option disabled value={''}>Seleccione el tipo de material</option>
							{data?.material.map((materiales) => (
								<option key={`material_${materiales.id}`} value={materiales.name}>{materiales.name}</option>
							))}
						</select>
					</label>
					<label htmlFor='movimiento' className='flex flex-col'>
						<span>Movimiento</span>
						<select name='movimiento' value={formData.movement} onChange={(e)=>setFormData((prev)=>({...prev, movement:e.target.value}))}>
							<option disabled value={''}>Seleccione el tipo de movimiento</option>
							<option value='input'>Entrada</option>
							<option value='output'>Salida</option>
						</select>
					</label>
					<label htmlFor='valor' className='flex flex-col'>
						<span>Valor para el tipo de movimiento</span>
						<input type='number' name='valor' min={0} step={1} placeholder='0' 
							value={formData.movement === 'input'
							? formData.input.toString()
							: formData.movement === 'output'
							? formData.output.toString()
							: ''} 
							onChange={(e)=>setFormData((prev)=>({...prev, input: parseInt(e.target.value)}))}>
						</input>
					</label>
					<div className='w-full flex justify-center gap-6'>
						<button type='submit' disabled={MutationLoading}>
							{MutationLoading ? <ReactLoading type='spin' height={30} width={30} color='white'/> : 'Crear'}
						</button>
						<button type='button' onClick={()=>setOpenModalMovimientos(false)} className='secondary'>Cancelar</button>
					</div>
				</form>
    	</div>
    </Modal>
  )
}

export {ModalMovimientos}