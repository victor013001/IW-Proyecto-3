import { useMaterialsContext } from '@context/materialesContext';
import Modal from './Modal';
import React, { FormEvent } from 'react'



const ModalMateriales = () => {

  const {openModalMateriales, setOpenModalMateriales} = useMaterialsContext();

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
				<label htmlFor='name' className='flex flex-col'>
					<span>Nombre</span>
					<input type='text' name='name'></input>
				</label>
				<label htmlFor='balance' className='flex flex-col'>
					<span>Cantidad</span>
					<input type='number' name='balance' min={0} step={1} placeholder='0'></input>
				</label>
				<div className='w-full flex justify-center gap-6'>
						<button type='button' onClick={()=>setOpenModalMateriales(false)} className='secondary'>Cancelar</button>
						<button type='button'>Crear</button>
				</div>
			</form>	
		</div>
    </Modal>
  )
}

export {ModalMateriales}
