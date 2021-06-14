import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";
import { Spinner } from "react-bootstrap";
import DateMask from "./datemask";
// import DatePicker from "react-datepicker2";
// import momentJalaali from "moment-jalaali";
import MdatePicker, { getCustomFormat } from "./mdatepicker";
class Form extends Component {
  state = {
    data: {},
    errors: {},
    iswaiting:false
  };

  validate = () => {
    const options = { abortEarly: false };

    const { error } = Joi.validate(this.state.data, this.schema, options);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error && !name.includes("Date") ? error.details[0].message : null;
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  handledatechange = (input, name) => {
    let dateval = getCustomFormat(input, false);
    const data1 = { ...this.state.data };
    data1[name] = dateval;

    this.setState((prevState) => {
      if (prevState.data[name] !== data1[name]) this.state.data = data1;
    });
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;

    this.setState({ data, errors });
  };

  renderButton(
    label,
    enabled = true,
    classname = "btn btn-primary m-2 pull-left ",
    ) {
    return (
     <div>
     <button  disabled={this.validate() || !enabled} className={classname}>
        
        {label}
      </button>
      {this.state.iswaiting && (
        <Spinner
          as="span"
          animation="grow"
          size="sm"
          role="status"
          aria-hidden="true"
        />

      )}
      </div>
    );
  }

  renderDate(name, label, styles) {
    const { data, errors } = this.state;

    return (
      <div>
        {/* <DateMask
          name={name}
          label={label}
          style={styles}
          value={data[name]}
          onChange={this.handleChange}
          error={errors[name]}
        /> */}
        <MdatePicker
          label={label}
          inpval={data[name]}
          name={name}
          onChange={(e) => this.handledatechange(e, name)}
        />
      </div>
    );
  }

  renderSelect(name, label, options) {
    const { data, errors } = this.state;

    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleChange}
        error={errors[name]}
      />
    );
  }

  renderInput(name, label, type = "text", styles, isautofocus = false) {
    const { data, errors } = this.state;

    return (
      <Input
        type={type}
        name={name}
        value={data[name]}
        style={styles}
        label={label}
        onChange={this.handleChange}
        error={errors[name]}
        isautofocus={isautofocus}
      />
    );
  }
}

export default Form;
