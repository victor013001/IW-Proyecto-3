import { useMaterialesContext } from '@context/materialesContext';
import Modal from './Modal';
import React, { FormEvent } from 'react'



const ModalMateriales = () => {

  const {openModalMateriales, setOpenModalMateriales} = useMaterialesContext();

  const submitForm = (e:FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

  return (
    <Modal
	open={openModalMateriales}
	setOpen={setOpenModalMateriales}
	modalTitle='Agregar nuevo material'>
        <div>
      	<form onSubmit={submitForm} className='flex flex-col gap-3'>
				<label htmlFor='date' className='flex flex-col'>
						<span>Fecha</span>
						<input type='date' name='date'></input>
					</label>
					<label htmlFor='movimiento' className='flex flex-col'>
						<span>Movimiento</span>
						<select name='movimiento' defaultValue={'None'}>
							<option disabled value='None'>Seleccione el tipo de movimiento</option>
							<option value='Entrada'>Entrada</option>
							<option value='Salida'>Salida</option>
						</select>
					</label>
					<label htmlFor='valor' className='flex flex-col'>
						<span>Valor para el tipo de movimiento</span>
						<input type='number' name='valor' min={0} step={1} placeholder='0'></input>
					</label>
					<div className='w-full flex justify-center gap-6'>
						<button type='button'>Crear</button>
						<button type='button' onClick={()=>setOpenModalMateriales(false)} className='secondary'>Cancelar</button>
					</div>
				</form>
    	</div>
    </Modal>
  )
}

export {ModalMateriales}
