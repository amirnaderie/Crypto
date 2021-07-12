import React from "react";
import DatePicker from "react-datepicker2";

const DatePicker1 = ({ name, label,error,direction="rtl", ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name} className={`${direction}==="rtl"?pull-right:"" m-2`} >{label}</label>
      <DatePicker
        name={name}
        {...rest}
        className="form-control"
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default DatePicker1;
