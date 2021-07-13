import React from "react";
import Select from "react-dropdown-select";

const SelectSearch = ({ name, label,labelcolor="text-dark", options,value,direction="rtl",changehandle, ...rest }) => {
  return (
    <div className="form-group">
    <label htmlFor={name} className={`${direction}==="rtl"?pull-right:"" m-2 ${labelcolor}`}>{label}</label>
    {options  &&  <Select options={options} name={name} placeholder="ُSelect ..." onChange={(values) =>changehandle(name,values)} values={value!==0?[options.find(opt => opt.value ===value)]:undefined} />}
   </div>
  );
};

export default SelectSearch;
