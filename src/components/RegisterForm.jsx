import React from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from "../services/userService";
import auth from "../services/authService";
import { toast } from "react-toastify";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().email().label("Username"),
    password: Joi.string().required().min(5).label("Password"),
    name: Joi.string().required().label("Name"),
  };

  doSubmit = async () => {
    try {
      const response = await userService.register(this.state.data);
      auth.loginWithJwt(response.headers["x-auth-token"]);
      if (window.location.pathname === "/rentals")
        toast.success("ثبت با موفقیت انجام پذیرفت", {
          position: toast.POSITION.TOP_LEFT,
        });
      else window.location = "/movies";
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
        toast.error("خطا در ثبت اطلاعات", {
          position: toast.POSITION.TOP_LEFT,
        });
      }
    }
  };

  render() {
    return (
      <div className="col-md-5 container justify-content-center">
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "نام کاربری(ایمیل)")}
          {this.renderInput("password", "رمز ورود", "password")}
          {this.renderInput("name", "نــام")}
          {this.renderButton("Register")}
          <button className="btn btn-success btn-lg"
         onClick={() => window.print()}>PRINT</button>
        </form>
      </div>
    );
  }
}

export default RegisterForm;
