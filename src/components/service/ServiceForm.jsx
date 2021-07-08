import React, { useState, useEffect } from "react";
import Joi from "joi-browser";

import Input from "../common/input";
import Validation from "../common/validation";
import { getBrands, getModels } from "../../services/mabnaService";
import "./ServiceForm.css";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import SelectSearch from "../common/selectsearch";
import Select from "../common/select";

const initialFormState = {
  brand: 0,
  model: 0,
  productYear: "",
  type: "",
};

const schema = {
  brand: Joi.number().min(1).required().label("Brand"),
  model: Joi.number().min(1).required().label("Model"),
  productYear: Joi.number().min(1980).max(2021).required().label("Date Of Production"),
  type: Joi.string().required().label("ServiceType"),
};

const ServiceForm = () => {
  const [form, setForm] = useState(initialFormState);
  const [brands, setBrands] = useState(null);
  const [models, setModels] = useState(null);
  const { errors } = Validation(form, schema);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    async function fetchAPI() {
      const { data } = await getBrands();

      //setBrands([...data,{_id:0,groupid:1,label:"select ...",value:0}]);
      setBrands(data);
    }
    fetchAPI();
  }, []);

  const setInput = (e) => {
      const newValue = { [e.target.name]: e.target.value };
      return setForm((form) => ({ ...form, ...newValue }));
   
  };
  const setSelect = async (inputName, inputNameValue) => {
    if (inputNameValue.length !== 0) {
      const { data } = await getModels(inputNameValue[0].value);
      setModels(data);
      const newValue = { [inputName]: inputNameValue[0].value };
      return setForm((form) => ({ ...form, ...newValue }));
    }
  };

  const setSelectModel = ({ currentTarget: input }) => {
    const newValue = { [input.name]: input.value };
    return setForm((form) => ({ ...form, ...newValue }));
  };


  //  const brandvalue=()=>{
  //   if (brands)
  //      return;
  //  }

  return (
    <div className="direction">
      <h1 className="text-dark">Service</h1>
      <form>
        <SelectSearch
          options={brands}
          name="brand"
          label="Brand"
          changehandle={setSelect}
          value={form.brand}
        ></SelectSearch>
       <Select
        name="model"
        id="model"
        value={form.model}
        label="Model"
        options={models}
        onChange={setSelectModel}
        error={errors.model}
        optionlabel="label"
        optionvalue="value"
      />
      <Input
            name="productYear"
            type="number"
            onChange={setInput}
            label="Date Of Production"
            value={form.productYear}
            error={errors.productYear}
            maxLength="4" 
          
          />
        
        <Input
            name="type"
            onChange={setInput}
            label="ServiceType"
            value={form.type}
            error={errors.type}
          />
               
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
