import React from "react";

const Input = ({
  type = "text",
  label,
  labelcolor = "text-dark",
  error,
  isautofocus = false,
  direction = "rtl",
  coreClass = "col-lg-6",
  ...rest
}) => {
  // const [touched, setTouched] = useState(false);
  const handlekeydown = (e) => {
    if (
      e.target.type === "number" &&
      !(
        e.keyCode === 8 ||
        e.keyCode === 46 ||
        e.keyCode === 37 ||
        e.keyCode === 39
      )
    )
      if (
        !(
          (e.keyCode >= 48 && e.keyCode <= 57) ||
          (e.keyCode >= 96 && e.keyCode <= 105)
        ) ||
        e.target.value.toString().length >= e.target.maxLength
      )
        e.preventDefault();
  };
  return (
    <div className="form-group mb-3 ">
      <label
        htmlFor={rest.name}
        className={`${direction}==="rtl"?pull-right:"" ${labelcolor} w-100`}
      >
        {label}
      </label>
      <input
        {...rest}
        type={type}
        name={rest.name}
        id={rest.name}
        onKeyDown={handlekeydown}
        autoFocus={isautofocus}
        className={`col-12 ${coreClass}`}
        // onBlur={() => setTouched(true)}
      />
      {error && (
        <span className="text-danger mx-2">
          <small>{error.message}</small>
        </span>
      )}
    </div>
  );
};

export default Input;
