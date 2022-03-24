import React,{useState,useRef} from "react";
import './input.css';
const Input = ({
  type = "text",
  label,
  labelcolor = "text-dark",
  error,
  isautofocus = false,
  direction = "rtl",
  coreClass = "",
  effect=false,
  ...rest
}) => {
  const [isMyInputFocused, setIsMyInputFocused] = useState(false);
  const InputRef = React.useRef(null);
  React.useEffect(()=>{
    isautofocus&&InputRef.current.focus();
  }, []);

  const handlekeydown = (e) => {
    if (
      e.target.type === "number" &&
      !(
        e.keyCode === 8 ||
        e.keyCode === 46 ||
        e.keyCode === 37 ||
        e.keyCode === 39 ||
        e.keyCode === 9 ||
        e.keyCode === 110 ||
        e.keyCode === 190
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
    <div className="form-group mb-5 input-contain">
      
       {(!effect&& <label htmlFor={rest.name} className={`${direction==="rtl"?"pull-right":""} ${labelcolor}  col-12 `}>
           {label}
         </label>)}
       
        <input ref={InputRef} {...rest}  type={type} name={rest.name} id={rest.name}  onKeyDown={handlekeydown}
        className={`rounded py-1 col-12  ${coreClass}`} onFocus={() => setIsMyInputFocused(true)} 
        placeholder={((isMyInputFocused===true&& rest.value===""&&effect)||!effect)?rest.placeholder:""}
        onBlur={() => setIsMyInputFocused(false)}
        value={rest.value===""?"":rest.value}    aria-labelledby={`placeholder-${rest.name}`}/>
       
       
        {(effect&& <label className="placeholder-text" htmlFor={rest.name} id={`placeholder-${rest.name}`}>
            <div className="text">{label}</div>
        </label>)} 
   
        {error && (
        <div className="text-danger position-absolute ">
          <small>{error.message}</small>
        </div>
      )}
    </div>
  );
};

export default Input;
