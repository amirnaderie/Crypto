import React from "react";
//import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Captcha from "demos-react-captcha";
import { toast } from "react-toastify";

import Form from "./common/form";
import auth from "../services/authService";
import ToggleSwitch from "./common/toggle/ToggleSwitch";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {},
    captchaState: false,
    iswaiting: false,
    heightdimension: window.innerHeight,
    mainheight: window.innerHeight - 90,
    siteStyle:false,
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
      const { state } = this.props.location;
      this.setState({ iswaiting: false });
      window.location = state ? state.from.pathname : `/home?style=${this.state.siteStyle}`;
    } catch (ex) {
      if (ex.response)
        toast.error(ex.response.data, { position: toast.POSITION.TOP_LEFT });
      else toast.error("Network Error", { position: toast.POSITION.TOP_LEFT });
      this.setState({ iswaiting: false });
    }
  };

  render() {
    //if (auth.getCurrentUser()) return <Redirect to="/movies" />;

    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: this.state.mainheight }}
      >
        <form onSubmit={this.handleSubmit} className="sub-main-w3">
          <h1>Login</h1>
          <div className="mb-3 input">
            {this.renderInput(
              "username",
              "نام کاربری",
              "text",
              {
                direction: "ltr",
              },
              true
            )}
          </div>
          <div className="mb-3 input">
            {this.renderInput("password", "رمز عبور", "password", {
              direction: "ltr",
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
          <div className="d-flex flex-row align-items-center space-between">
          <div className="mb-3 ">
            {this.renderButton("Login", this.state.captchaState, undefined)}
          </div>
          <div className="mb-3 ms-auto">
          <ToggleSwitch
          optionLabels={["Style1","Style2"]}
          checked={this.state.siteStyle}
          onChange={()=>this.setState(prevState => ({ siteStyle: !prevState.siteStyle }))}
          width="100px"
          labelwidth="55px"
          Onbg="#19ba4f"
          Offbg="white"
        />
          </div>
          </div>
        </form>

        <div className="footer">
          <h2>
            <span className="h1">&copy;</span> 2021 My Login Form. All rights
            reserved | Design by
            <a href="http://amir.com"> amir </a>
          </h2>
        </div>
      </div>
    );
  }
}

export default LoginForm;
