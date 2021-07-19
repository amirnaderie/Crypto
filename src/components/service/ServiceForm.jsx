import React, { useState, useEffect, useContext } from "react";
import Joi from "joi-browser";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

import Input from "../common/input";
import { getBrands, getModels, getTimes } from "../../services/mabnaService";
import SelectSearch from "../common/selectsearch";
import Select from "../common/select";
import DatePicker1 from "../common/datepicker";

import { saveRequest } from "../../services/requestService";

import { UserContext } from "../context/Context";

import "./ServiceForm.css";

const initialFormState = {
  brand: 0,
  model: 0,
  productyear: "",
  servicetype: "",
  servicedate: new Date().toLocaleDateString("en-ZA"),
  servicetime: 1,
  address: "",
  tel: "",
};
const pattern = /^[0]{1}[9]{1}[1-9]{9}$/;

const schema = {
  brand: Joi.number().min(1).required().label("Brand"),
  model: Joi.number().min(1).required().label("Model"),
  productyear: Joi.number()
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
};

const ServiceForm = () => {
  const { user } = useContext(UserContext);
  const [form, setForm] = useState({
    ...initialFormState,
    ...{ address: user.address, tel: user.tel },
  });
  const [brands, setBrands] = useState(null);
  const [models, setModels] = useState(null);
  const [times, setTimes] = useState(null);
  const [iswaiting, setWaiting] = useState(false);
  const [errors, setErrors] = useState({});

  //const { errors } = Validation(form, schema);

  useEffect(() => {
    async function fetchAPI() {
      const { data: branddata } = await getBrands();
      const { data: timedate } = await getTimes();

      setTimes(timedate);
      setBrands(branddata);
    }
    fetchAPI();
  }, []);

  const setInput = (e) => {
    validateProperty(e.target);
    const newValue = { [e.target.name]: e.target.value };
    return setForm((form) => ({ ...form, ...newValue }));
  };

  const setSelectSearch = async (inputName, inputNameValue) => {
    if (inputNameValue.length !== 0) {
      const { data } = await getModels(inputNameValue[0].value);
      setModels(data);
      //setSelect({name:"model",value:1});
      const newValue = { [inputName]: inputNameValue[0].value };
      setForm((form) => ({ ...form, ...newValue }));
      setSelect({ currentTarget: { name: "model", value: 1 } });
    }
  };

  const setSelect = ({ currentTarget: input }) => {
    validateProperty(input);
    const newValue = { [input.name]: parseInt(input.value, 10) };
    return setForm((form) => ({ ...form, ...newValue }));
  };
  const handleDateChange = (value) => {
    setForm((form) => ({
      ...form,
      ...{ servicedate: value.format("YYYYMMDD") },
    }));
  };

  const remove_from_errorlist = (itemname) => {
    let localerrors = { ...errors };
    delete localerrors[itemname];
    setErrors(localerrors);
  };
  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const Schema = { [name]: schema[name] };
    const { error } = Joi.validate(obj, Schema);
    if (!errors[name]) return;
    if (!error) {
      remove_from_errorlist(name);
      return;
    }
    if (error.details[0].type !== errors[name].type)
      remove_from_errorlist(name);
  };

  const validate = () => {
    const options = { abortEarly: false };
    const { error } = Joi.validate(form, schema, options);
    if (!error) return {};

    const errorList = {};
    for (let item of error.details)
      errorList[item.path[0]] = { message: item.message, type: item.type };

    return errorList;
  };

  const doSubmit = async (e) => {
    try {
      e.preventDefault();

      const formerrors = await validate();
      setErrors(formerrors);

      if (Object.keys(formerrors).length > 0) return;

      setWaiting(true);
      await saveRequest(form);
      await toast.success("Your request has been successfully submitted", {
        position: toast.POSITION.TOP_LEFT,
      });
      setWaiting(false);
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data, { position: toast.POSITION.TOP_LEFT });
      else
        toast.error("Connection Error", {
          position: toast.POSITION.TOP_LEFT,
        });

      //   toast.error("خطا در ثبت اطلاعات", { position: toast.POSITION.TOP_LEFT });
      setWaiting(false);
    }
  };

  return (
    <div className="col-lg-10 container justify-content-center align-items-center ">
      <h1 className="text-dark">Service</h1>
      <form className="direction sub-main-w3" onSubmit={doSubmit}>
        <div className="row  justify-content-center">
          <div className=" col-lg-6">
            <SelectSearch
              tabIndex="0"
              options={brands}
              name="brand"
              labelcolor="text-info"
              label="Brand"
              changehandle={setSelectSearch}
              value={form.brand}
              autoFocus="true"
            ></SelectSearch>
          </div>
          <div className=" col-lg-6">
            <Select
            tabIndex="1"
              name="model"
              id="model"
              labelcolor="text-info"
              value={form.model}
              label="Model"
              options={models}
              onChange={setSelect}
              error={errors.model}
              optionlabel="label"
              optionvalue="value"
              placeholder="Please First Select A Brand ..."
            />
          </div>
        </div>
        <div className="row  justify-content-center">
          <div className=" col-lg-6">
            <Input
            tabIndex="2"
              name="productyear"
              type="number"
              labelcolor="text-info"
              onChange={setInput}
              label="Date Of Production"
              value={form.productyear}
              error={errors.productyear}
              maxLength="4"
              placeholder={new Date().getFullYear()}
            />
          </div>
          <div className=" col-lg-6">
            <Input
              tabIndex="3"
              name="servicetype"
              labelcolor="text-info"
              onChange={setInput}
              label="ServiceType"
              value={form.servicetype}
              error={errors.servicetype}
            />
          </div>
        </div>
        <div className="row  justify-content-center">
          <div className="col-lg-6">
            <DatePicker1
            TabIndex="4"
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
          </div>
          <div className="col-lg-6">
            <Select
            tabIndex="5"
              name="servicetime"
              id="servicetime"
              labelcolor="text-info"
              value={form.servicetime}
              label="ServiceTime"
              options={times}
              onChange={setSelect}
              error={errors.servicetime}
              optionlabel="label"
              optionvalue="value"
              placeholder="Select ..."
            />
          </div>
        </div>
        <div className="row  justify-content-center">
          <div className="col-lg-6">
            <Input
            tabIndex="6"
              name="address"
              type="textare"
              labelcolor="text-info"
              onChange={setInput}
              label="Address"
              value={form.address}
              error={errors.address}
            />
          </div>
          <div className="col-lg-6">
            <Input
            tabIndex="7"
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
          </div>
        </div>
        <div className="col-lg-6">
        <div className="form-group mt-3">
         
          <button className="btn btn-primary " tabIndex="8">Request&nbsp;&nbsp;&nbsp;
          {iswaiting && (
              <span className="spinner-grow spinner-grow-sm align-middle" role="status" aria-hidden="true"></span>
          )}
          {!iswaiting && (
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span> )
          }
          </button>
         
        </div>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
