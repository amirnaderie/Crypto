import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Select from "react-dropdown-select";

import Input from "../common/input1";
import Validation from "../common/validation";
import  {getMabnas}  from "../../services/mabnaService";
import { faStepBackward } from '@fortawesome/free-solid-svg-icons';

const br = [
  { value: 1, label: 'UG1' },
  { value: 2, label: 'UZ1' },
  { value: 3, label: 'ایران' },
  { value: 4, label: 'AU1' },
  { value: 5, label: 'UA1' },
  { value: 6, label: 'Eurozone' },
  
];


const initialFormState = {
  brand:0,
  email: "",
  password: ""
};

const schema = {
  brand: Joi.number().min(1).required().label("Brand"),
  email: Joi.string().required().email().label("Email"),
  password: Joi.string().required().label("Password"),
};

const ServiceForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [brands, setBrands] = useState(null);
  const { errors } = Validation(form, schema);
  
  useEffect( () => {
    async function fetchAPI() {
      const  {data} =await getMabnas("brand");
      setBrands([...data,{_id:0,groupid:1,label:"select ...",value:0}]);
    }
    fetchAPI()
  
    
  }, []);

 const setInput=(inputName)=> {
    return (e) => {
      const newValue = { [inputName]: e.target.value };
      return setForm((form) => ({ ...form, ...newValue }));
    };
  }
  const setSelect=(inputName,inputNameValue)=> {
      const newValue = { [inputName]: inputNameValue[0].value };
      return setForm((form) => ({ ...form, ...newValue }));
   }
//  const brandvalue=()=>{
//   if (brands)
//      return;
//  }

  return (
    <div>
       <h1 className="text-dark">Service</h1>
      <form>
        <div className="form-group">
        {/* {(selectedCountry!==null && selectedCountry!=="undefined") && selectedCountry[0].label} */}
       {(brands===null|| form.brand===0) && <Select options={brands} placeholder="ُSelect ..." onChange={(values) =>setSelect("brand",values)}/>}
        {(brands && form.brand!==0) &&  <Select options={brands} placeholder="ُSelect ..." onChange={(values) =>setSelect("brand",values)} values={[ brands.find(opt => opt.value === form.brand)]} />}
     
          <Input
            name="name"
            onChange={setInput("name")}
            label="Name"
            value={form.name}
            error={errors.name}
          />
        </div>
        <div className="form-group">
          <Input
            name="email"
            onChange={setInput("email")}
            label="E-mail"
            value={form.email}
            error={errors.email}
          />
        </div>
        <div className="form-group">
          <Input
            name="password"
            onChange={setInput("password")}
            label="Password"
            value={form.password}
            error={errors.password}
          />
        </div>

        <div className="form-group">
          <button type="button" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
