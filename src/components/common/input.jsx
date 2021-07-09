import React, { useState } from 'react';

const Input = ({type = "text",label, error,isautofocus=false,direction="rtl", ...rest }) => {
  const [touched, setTouched] = useState(false)
const handlekeydown=(e)=>{
  if ((e.target.type==="number")&& !(e.keyCode===8 || e.keyCode===46 || e.keyCode===37 || e.keyCode===39))
   if (!((e.keyCode >= 48 && e.keyCode <= 57)|| (e.keyCode >= 96 && e.keyCode <= 105) )||(e.target.value.toString().length>=e.target.maxLength ))
    e.preventDefault();
     
}
  return (
    <div className="form-group" >
      <label htmlFor={rest.name} className={`${direction}==="rtl"?pull-right:"" m-2`}>{label}</label>
      <input {...rest} type={type} name={rest.name} id={rest.name} onKeyDown={handlekeydown}  autoFocus={isautofocus} className="form-control" onBlur={() => setTouched(true)} />
      {(touched && error)&& <div className="text-danger">{error}</div>}
    </div>
  );
};

export default Input;
