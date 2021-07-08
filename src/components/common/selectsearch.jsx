import React from "react";
import Select from "react-dropdown-select";

const SelectSearch = ({ name, label, options,value,changehandle, ...rest }) => {
  return (
    <div className="form-group">
    <label htmlFor={name}>{label}</label>
    {{options}  &&  <Select options={options} name={name} placeholder="ُSelect ..." onChange={(values) =>changehandle(name,values)} values={value!==0?[options.find(opt => opt.value ===value)]:undefined} />}
   </div>
  );
};

export default SelectSearch;
