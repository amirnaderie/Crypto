import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Validation from "./validation";

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

const ContactUsForm = () => {
  const [form, setForm] = useState(initialFormState);
  const { errors } = Validation(form, schema);

  function setInput(inputName) {
    return (e) => {
      const newValue = { [inputName]: e.target.value };
      return setForm((form) => ({ ...form, ...newValue }));
    };
  }

  return (
    <div>
       <h1 className="text-dark">Contact Us</h1>
      <a href="tel:+989125758468">
        <i
          aria-hidden="true"
          className=" fa fa-phone-square text-info fa-2x pull-left m-1"
        ></i>
      </a>
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

export default ContactUsForm;
