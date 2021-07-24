import React from "react";
import Select from "react-dropdown-select";
import "../../App.css";
const SelectSearch = ({
  name,
  label,
  labelcolor = "text-dark",
  options,
  value,
  direction = "rtl",
  coreClass = "",
  changehandle,
  error,
  ...rest
}) => {
  return (
    <div className="form-group mb-5 position-relative">
      
        <label
          htmlFor={name}
          className={`${direction}==='rtl'?pull-right:'' ${labelcolor} col-12 col-lg-6 `}
        >
          {label}
        </label>

        {options && (
          <div className="selectAndDatepicker">
            <Select
              options={options}
              name={name}
              {...rest}
              placeholder="ُSelect ..."
              className={`rounded bg-light text-dark  col-12 ${coreClass}`}
              onChange={(values) => changehandle(name, values)}
              values={
                value !== 0
                  ? [options.find((opt) => opt.value === value)]
                  : undefined
              }
            />
          </div>
        )}
        {error && (
        <div className="text-danger position-absolute">
          <small>{error.message}</small>
        </div>
      )}
      
    </div>
  );
};

export default SelectSearch;
