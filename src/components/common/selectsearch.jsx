import React from "react";
import Select from "react-dropdown-select";

const SelectSearch = ({
  name,
  label,
  labelcolor = "text-dark",
  options,
  value,
  direction = "rtl",
  coreClass = "col-lg-6",
  changehandle,
  ...rest
}) => {
  return (
    <div className="form-group mb-3">
      <label
        htmlFor={name}
        className={`${direction}==="rtl"?pull-right:"" ${labelcolor} w-100`}
      >
        {label}
      </label>
      {options && (
        <Select
          options={options}
          name={name}
          placeholder="ُSelect ..."
          className={`col-12 ${coreClass}`}
          onChange={(values) => changehandle(name, values)}
          values={
            value !== 0
              ? [options.find((opt) => opt.value === value)]
              : undefined
          }
        />
      )}
    </div>
  );
};

export default SelectSearch;
