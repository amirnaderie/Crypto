import React from "react";

const Input = ({label, error,isautofocus, ...rest }) => {
  return (
    <div className="form-group" >
      <label htmlFor={rest.name} className="pull-right m-2">{label}</label>
      <input {...rest} name={rest.name} id={rest.name} autoFocus={isautofocus} className="form-control" />
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Input;
