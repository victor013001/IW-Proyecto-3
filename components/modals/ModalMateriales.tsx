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
      		<span>Hola</span>
    	</div>
    </Modal>
  )
}

export {ModalMateriales}
