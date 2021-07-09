import React, { useState } from 'react';

const Select = ({ name, label, options,optionlabel,optionvalue,direction="rtl", error, ...rest }) => {
  const [touched, setTouched] = useState(false)
  return (
    <div className="form-group">
      <label htmlFor={name} className={`${direction}==="rtl"?pull-right:"" m-2`}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control" onBlur={() => setTouched(true)}>
      {rest.placeholder && <option value="" disabled selected>{rest.placeholder}</option>}
        {options  &&  options.map(option => (
          <option key={option._id} value={option[optionvalue]}>
            {option[optionlabel]}
          </option>
        ))}
      </select>
      {(touched && error)&& <div className="text-danger">{error}</div>}
      
    </div>
  );
};

export default Select;
