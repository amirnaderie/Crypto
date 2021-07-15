import React from "react";
import DatePicker from "react-datepicker2";

const DatePicker1 = ({
  name,
  label,
  error,
  labelcolor = "text-dark",
  coreClass = "col-lg-6",
  direction = "rtl",
  ...rest
}) => {
  return (
    <div className="form-group mb-3">
      <label
        htmlFor={name}
        className={`${direction}==="rtl"?pull-right:""  ${labelcolor} w-100`}
      >
        {label}
      </label>
      <DatePicker name={name} {...rest} className={`col-12 ${coreClass}`} />
      {error && (
        <span className="text-danger mx-2">
          <small>{error.message}</small>
        </span>
      )}
    </div>
  );
};

export default DatePicker1;
