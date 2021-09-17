import React, { useState, useEffect, useContext } from "react";
import Joi from "joi-browser";
import moment from "moment-jalaali";
import { toast } from "react-toastify";
//import { Spinner } from "react-bootstrap";

import Input from "../common/input/input";
import { getMabnas, getModels } from "../../services/mabnaService";
import SelectSearch from "../common/selectsearch";
import Select from "../common/select";
import DatePicker1 from "../common/datepicker";

import { saveService } from "../../services/serviceService";
import { UserContext } from "../context/Context";
import { sortItems } from "../../utils/paginate";

import "./ServiceForm.css";

const initialFormState = {
  brand: 0,
  model: 0,
  productyear: "",
  servicetype: 0,
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
  servicetype: Joi.number().min(1).required().label("ServiceType"),
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
  const [servicetypes, setServiceTypes] = useState(null);
  const [iswaiting, setWaiting] = useState(false);
  const [errors, setErrors] = useState({});

  //const { errors } = Validation(form, schema);

  useEffect(() => {
    async function fetchAPI() {
      const { data } = await getMabnas([
        "Brands",
        "ServiceType",
        "ServiceTime",
      ]);
      const timesdata = sortItems(
        data.filter((m) => m.label === "ServiceTime")[0].mabnas,
        "value",
        "asc"
      );
      setTimes(timesdata);
      const branddata = sortItems(
        data.filter((m) => m.label === "Brands")[0].mabnas,
        "label",
        "asc"
      );
      setBrands(branddata);
      const servicedata = sortItems(
        data.filter((m) => m.label === "ServiceType")[0].mabnas,
        "label",
        "asc"
      );
      setServiceTypes(servicedata);
    }
    fetchAPI();
  }, []);

  const setInput = (e) => {
    validateProperty(e.target);
   const {name,value}=e.target;
    const newValue = { [name]: value };
    return setForm((form) => ({ ...form, ...newValue }));
  };

  const setSelectSearch = async (inputName, inputNameValue) => {
    validateProperty({
      name: inputName,
      value: parseInt(inputNameValue[0].value, 10),
    });
    const newValue = { [inputName]: inputNameValue[0].value };
    setForm((form) => ({ ...form, ...newValue }));
    if (inputName === "brand" && inputNameValue.length !== 0) {
      const { data } = await getModels(inputNameValue[0].value);
      setModels(data);
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
     await saveService({...form,...{user:user._id}});
     await toast.success("Your request has been successfully submitted", {
       position: toast.POSITION.TOP_LEFT,
     });
     setWaiting(false);
    } catch (ex) {
      if (ex.response)
      toast.error(ex.response.data, { position: toast.POSITION.TOP_LEFT });
    else toast.error("Network Error", { position: toast.POSITION.TOP_LEFT });

   
      setWaiting(false);
    }
  };

  return (
    <div>
      <h1 className="text-dark">Service</h1>
      <form className="direction sub-main-w3" onSubmit={doSubmit}>
        <div className="row ">
          <div className=" col-lg-6">
            <SelectSearch
              tabIndex="0"
              options={brands}
              name="brand"
              labelcolor="text-info"
              label="Brand"
              changehandle={setSelectSearch}
              value={form.brand}
              // autoFocus="true"
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
        <div className="row ">
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
              effect={false}
            />
          </div>
          <div className=" col-lg-6">
            <SelectSearch
              tabIndex="3"
              options={servicetypes}
              name="servicetype"
              labelcolor="text-info"
              label="ServiceType"
              changehandle={setSelectSearch}
              value={form.servicetype}
              error={errors.servicetype}
            ></SelectSearch>
          </div>
        </div>
        <div className="row">
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
              handleclick={()=>{}}
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
        <div className="row">
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
              effect={false}
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
              effect={false}
            />
          </div>
        </div>
        <div className="col-lg-6">
          <div className="form-group mt-3">
            <button className="btn btn-primary" tabIndex="8">
              Request
              <i className={"fa fa-spinner fa-spin mx-1 " + (iswaiting?"visible":"invisible")} ></i>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ServiceForm;
