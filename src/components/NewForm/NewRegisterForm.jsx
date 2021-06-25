import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Input from "./Input";
import useValidation from "./hooks/useValidation";

const initialFormState = {
  name: "",
  email: "",
  password: ""
};

const schema = {
  name: Joi.string().required().label("Name"),
  email: Joi.string().required().email().label("Email"),
  password: Joi.string().required().label("Password"),
};

const NewRegisterForm = () => {
  const [form, setForm] = useState(initialFormState);
  const { errors } = useValidation(form, schema);

  function setInput(inputName) {
    return (e) => {
      const newValue = { [inputName]: e.target.value };
      return setForm((form) => ({ ...form, ...newValue }));
    };
  }

  return (
    <div>
      <h3>Form Controlled</h3>
      <form>
        <div className="form-group">
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

export default NewRegisterForm;
