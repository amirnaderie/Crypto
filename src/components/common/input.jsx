import React from "react";

const Input = ({
  type = "text",
  label,
  labelcolor = "text-dark",
  error,
  isautofocus = false,
  direction = "rtl",
  coreClass = "",
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
    <div className="form-group mb-5 position-relative">
      <label
        htmlFor={rest.name}
        className={`${direction}==="rtl"?pull-right:"" ${labelcolor}  col-12 `}
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
        className={`col-12  ${coreClass}`}
        // onBlur={() => setTouched(true)}
      />
      {error && (
        <div className="text-danger position-absolute ">
          <small>{error.message}</small>
        </div>
      )}
    </div>
  );
};

export default Input;
