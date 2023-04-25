import React, { forwardRef } from "react";
import './Input.css';

const Input = forwardRef((props, ref) => {
  return (
    <div className="form-control">
      <label htmlFor={props.id}>{props.label}</label>
      <input ref={ref} id={props.id} type={props.type} placeholder={props.placeholder} min={props.min} step={props.step} defaultValue={props.value}/>
    </div>
  )
});

export default Input;