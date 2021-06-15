import React from "react";
//import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Captcha from "demos-react-captcha";
import { toast } from "react-toastify";

import Form from "./common/form";
import auth from "../services/authService";


class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    captchaState: false,
    iswaiting:false,
  };

  schema = {
    username: Joi.string().required().label("Username"),
    password: Joi.string().required().label("Password"),
  };

  onCaptchaChange = (value) => {
    this.setState({ captchaState: value });
  };
  onrefresh = (value) => {};

  doSubmit = async () => {
    try {
      const { data } = this.state;
      this.setState({ iswaiting: true });
      await auth.login(data.username, data.password);
      this.setState({ iswaiting: false });
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : "/not-found";
    } catch (ex) {
      if (ex.response && ex.response.status === 400)
        toast.error(ex.response.data, { position: toast.POSITION.TOP_LEFT });
      else
        toast.error("خطا در برقراری ارتباط", {
          position: toast.POSITION.TOP_LEFT,
        });
        this.setState({ iswaiting: false });
    }
  };

  render() {
    //if (auth.getCurrentUser()) return <Redirect to="/movies" />;

    return (
      <div>
        <div className="sub-main-w3">


          <form onSubmit={this.handleSubmit} className="login">
          <h1>Login</h1>
            <div className="mb-3 input">
          
              {this.renderInput("username", "نام کاربری", "text", {
                direction:"ltr"
              },true)}
            </div>
            <div className="mb-3 input">
              {this.renderInput("password", "رمز عبور", "password",{
                direction:"ltr"
              })}
            </div>
            <div className="mb-3 text-dark">
              <Captcha
                length={1}
                onRefresh={this.onrefresh}
                onChange={this.onCaptchaChange}
                placeholder="متن بالا را وارد نمایید"
              />
            </div>
            <div className="mb-3">
            {this.renderButton("Login", this.state.captchaState,undefined)}
            </div>
          </form>
        </div>
        <div className="footer">
          <h2>
         <span className="h1">&copy;</span >  2018 My Login Form. All rights reserved | Design by
            <a href="http://amir.com"> amir </a>
          </h2>
        </div>
      </div>
    );
  }
}

export default LoginForm;
