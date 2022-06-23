import React from 'react';
import style from './backdrop.module.css'


function BackDrop({ show, close }) {
  return show ? <div onClick={close} className={style.backdrop} /> : null;
}

export default BackDrop
