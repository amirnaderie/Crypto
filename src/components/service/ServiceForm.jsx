import React, { useState, useEffect, useContext } from "react";
import Joi from "joi-browser";
import moment from "moment-jalaali";

import Input from "../common/input";
import Validation from "../common/validation";
import { getBrands, getModels,getTimes } from "../../services/mabnaService";
import "./ServiceForm.css";
import { faStepBackward } from "@fortawesome/free-solid-svg-icons";
import SelectSearch from "../common/selectsearch";
import Select from "../common/select";
import DatePicker1 from "../common/datepicker";
import { UserContext } from "../context/Context";

const initialFormState = {
  brand: 0,
  model: 0,
  productYear: "",
  servicetype: "",
  servicedate: new Date().toLocaleDateString("en-ZA"),
  servicetime: 1,
  address: "",
  tel: "",
};
const pattern = /^[0]{1}[9]{1}[1-9]{9}$/;

const schema = Joi.object().keys({
  brand: Joi.number().min(1).required().label("Brand"),
  model: Joi.number().min(1).required().label("Model"),
  productYear: Joi.number()
    .min(1980)
    .max(new Date().getFullYear())
    .required()
    .label("Date Of Production"),
  servicetype: Joi.string().min(5).max(60).required().label("ServiceType"),
  servicedate: Joi.date().raw().required().label("ServiceDate"),
  servicetime: Joi.number().min(1).required().label("ServiceTime"),
  address: Joi.string().min(5).max(255).required().label("Address"),
  tel: Joi.string()
    .min(11)
    .max(11)
    .required()
    .regex(pattern)
    .label("Tel")
    .error((errors) => {
      switch (errors[0].type) {
        case "string.min":
          errors[0].message = "Please Enter AtLeast 11 Numbers";
          break;
        case "string.regex.base":
          errors[0].message = "Please Follow The Pattern 09xxxxxxxx";
          break;
        default:
        // code block
      }
      return errors[0];
    }),
});

const ServiceForm = () => {
  const { user } = useContext(UserContext);
  //const [form, setForm] = useState(initialFormState);
  const [form, setForm] = useState({
    ...initialFormState,
    ...{ address: user.address, tel: user.tel },
  });
  const [brands, setBrands] = useState(null);
  const [models, setModels] = useState(null);
  const [times, setTimes] = useState(null);
  const { errors } = Validation(form, schema);

  useEffect(() => {
    async function fetchAPI() {
      const { data:branddata } = await getBrands();
      const { data:timedate } = await getTimes();
    
      setBrands(branddata);
      setTimes(timedate);
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
      //setSelectModel({name:"model",value:1});
      const newValue = { [inputName]: inputNameValue[0].value,model: 1 };
      return setForm((form) => ({ ...form, ...newValue }));
    }
  };

  const setSelectModel = ({ currentTarget: input }) => {
    const newValue = { [input.name]: input.value };
    return setForm((form) => ({ ...form, ...newValue }));
  };
  const handleDateChange = (value) => {
    setForm((form) => ({
      ...form,
      ...{ servicedate: value.format("YYYY/MM/DD") },
    }));
  };

  //  const brandvalue=()=>{
  //   if (brands)
  //      return;
  //  }

  return (
    <div className="col-md-3 container justify-content-center">
      <h1 className="text-dark">Service</h1>
      <form className="direction">
        <SelectSearch
          options={brands}
          name="brand"
          labelcolor="text-info"
          label="Brand"
          changehandle={setSelect}
          value={form.brand}
        ></SelectSearch>
        <Select
          name="model"
          id="model"
          labelcolor="text-info"
          value={form.model}
          label="Model"
          options={models}
          onChange={setSelectModel}
          error={errors.model}
          optionlabel="label"
          optionvalue="value"
          placeholder="Please First Select A Brand ..."
        />
        <Input
          name="productYear"
          type="number"
          labelcolor="text-info"
          onChange={setInput}
          label="Date Of Production"
          value={form.productYear}
          error={errors.productYear}
          maxLength="4"
          placeholder={new Date().getFullYear()}
        />

        <Input
          name="servicetype"
          labelcolor="text-info"
          onChange={setInput}
          label="ServiceType"
          value={form.servicetype}
          error={errors.servicetype}
        />

        <DatePicker1
          name="servicedate"
          label="ServiceDate"
          labelcolor="text-info"
          value={moment(form.servicedate, "YYYY/MM/DD")}
          min={moment(new Date().toLocaleDateString("en-ZA"), "YYYY/MM/DD")}
          isGregorian={true}
          onChange={handleDateChange}
          timePicker={false}
          error={errors.servicedate}
        />
<Select
          name="servicetime"
          id="servicetime"
          labelcolor="text-info"
          value={form.servicetime}
          label="ServiceTime"
          options={times}
          onChange={setSelectModel}
          error={errors.servicetime}
          optionlabel="label"
          optionvalue="value"
          placeholder="Select ..."
        />
        <Input
          name="address"
          labelcolor="text-info"
          onChange={setInput}
          label="Address"
          value={form.address}
          error={errors.address}
        />
        <Input
          name="tel"
          type="number"
          labelcolor="text-info"
          onChange={setInput}
          label="Tel"
          value={form.tel}
          error={errors.tel}
          placeholder="09xxxxxxxxx"
          maxLength="11"
        />

        <div className="form-group">
          <button type="button" className="btn btn-primary m-2">
            Request
          </button>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
