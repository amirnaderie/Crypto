import React from "react";

const Select = ({
  name,
  label,
  options,
  labelcolor = "text-dark",
  optionlabel,
  optionvalue,
  direction = "rtl",
  coreClass = "",
   error,
  ...rest
}) => {
  // const [touched, setTouched] = useState(false);
  return (
    <div className="form-group mb-5 position-relative">
      <label
        htmlFor={name}
        className={`${direction}==="rtl"?pull-right:"" ${labelcolor} col-12  `}
      >
        {label}
      </label>
      
     
      <select
        name={name}
        id={name}
        {...rest}
        className={`rounded col-12  ${coreClass}`}
        // onBlur={() => setTouched(true)}
      >
        {rest.placeholder  && (
          <option value='0' disabled>{rest.placeholder}</option>
        )}
        {options &&
          options.map((option,idx) => (
            <option key={idx} value={option[optionvalue]}>
              {option[optionlabel]}
            </option>
          ))}
      </select>
      {error && (
        <div className="text-danger position-absolute">
          <small>{error.message}</small>
        </div>
      )}
    </div>
  );
};

export default Select;
