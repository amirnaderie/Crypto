import React from "react";

const Input = ({ name, label, error,isautofocus, ...rest }) => {
  return (
    <div className="form-group" >
      <label htmlFor={name} className="pull-right m-2">{label}</label>
      <input {...rest} name={name} id={name} autoFocus={isautofocus} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
