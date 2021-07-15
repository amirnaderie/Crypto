import React, { useState, useEffect, useContext } from "react";
import Joi from "joi-browser";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
import { Spinner } from "react-bootstrap";

import Input from "../common/input";
import { getBrands, getModels, getTimes } from "../../services/mabnaService";
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

const schema = {
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
  const [iswaiting, SetWaiting] = useState(false);
  const [errors, SetErrors] = useState({});

  //const { errors } = Validation(form, schema);

  useEffect(() => {
    async function fetchAPI() {
      const { data: branddata } = await getBrands();
      const { data: timedate } = await getTimes();

      setBrands(branddata);
      setTimes(timedate);
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
      setSelect({currentTarget: { name: "model", value: 1 }});
    }
  };

  const setSelect = ({ currentTarget: input }) => {
    validateProperty(input);
    const newValue = { [input.name]: parseInt(input.value) };
    return setForm((form) => ({ ...form, ...newValue }));
  };
  const handleDateChange = (value) => {
    setForm((form) => ({
      ...form,
      ...{ servicedate: value.format("YYYY/MM/DD") },
    }));
  };

  const remove_from_errorlist = (itemname) => {
    let localerrors = { ...errors };
    delete localerrors[itemname];
    SetErrors(localerrors);
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
    if (!error) return null;

    const errorList = {};
    for (let item of error.details)
      errorList[item.path[0]] = { message: item.message, type: item.type };
    return errorList;
  };

  const doSubmit = async (e) => {
    try {
      e.preventDefault();

      SetErrors(validate() || {});
      if (errors) return;

      SetWaiting(true);

      // await saveMovie(this.state.data);
      await toast.success("ثبت با موفقیت انجام پذیرفت", {
        position: toast.POSITION.TOP_LEFT,
      });
    } catch (error) {
      toast.error("خطا در ثبت اطلاعات", { position: toast.POSITION.TOP_LEFT });
      SetWaiting(false);
    }
  };

  return (
    <div className="col-lg-9 container justify-content-center">
      <h1 className="text-dark">Service</h1>
      <form className="direction" onSubmit={doSubmit}>
        <SelectSearch
          options={brands}
          name="brand"
          labelcolor="text-info"
          label="Brand"
          changehandle={setSelectSearch}
          value={form.brand}
        ></SelectSearch>
        <Select
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
          onChange={setSelect}
          error={errors.servicetime}
          optionlabel="label"
          optionvalue="value"
          placeholder="Select ..."
        />
        <Input
          name="address"
          type="textare"
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
          <button className="btn btn-primary m-2">Request</button>
          {iswaiting && (
            <Spinner
              as="span"
              animation="grow"
              size="md"
              role="status"
              aria-hidden="true"
            />
          )}
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
