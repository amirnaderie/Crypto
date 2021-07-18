import React from "react";
import DatePicker from "react-datepicker2";

const DatePicker1 = ({
  name,
  label,
  error,
  labelcolor = "text-dark",
  coreClass = "",
  direction = "rtl",
  ...rest
}) => {
  return (
    <div className="form-group mb-5 position-relative">
     
        <label
          htmlFor={name}
          className={`${direction}==="rtl"?pull-right:""  ${labelcolor} col-12 col-lg-6`}
        >
          {label}
        </label>
        <div className="selectAndDatepicker">
          <DatePicker name={name} {...rest} className={`col-12 ${coreClass}`} />
        </div>
        {error && (
          <div className="text-danger position-absolute ">
            <small>{error.message}</small>
          </div>
        )}
     
    </div>
  );
};

export default DatePicker1;
