import React from 'react';
import style from './modal.module.css';
import Backdrop from './Backdrop/Backdrop';

function Modal({children,close,show}) {
  return (
	<>
		<Backdrop show={show} close={close}/>
		<div onClick={(e) => e.stopPropagation()} className={show ? style.on + ' ' + style.modal : style.modal}>
			{children}
		</div>
	</>
  )
}

export default Modal
