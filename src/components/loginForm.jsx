import React from "react";
//import { Redirect } from "react-router-dom";
import Joi from "joi-browser";
import Captcha from "demos-react-captcha";
import { toast } from "react-toastify";

import Form from "./common/form";
import auth from "../services/authService";
import ToggleSwitch from "./common/toggle/ToggleSwitch";
import GoogleLoginComponent from "./google/loginbutton/googlebutton";
import UseAuth from "./google/ontap/auth";

class LoginForm extends Form {
  state = {
    data: { email: "", password: "", idtoken: null },
    errors: {},
    captchaState: false,
    iswaiting: false,
    heightdimension: window.innerHeight,
    mainheight: window.innerHeight - 90,
    siteStyle: false,
    auth: false,
  };

  componentDidMount() {
    auth.logout();
  }
  schema = {
    email: Joi.string().required().label("Email"),
    password: Joi.string().required().label("Password"),
    idtoken: Joi.string().allow(null),
  };

  onCaptchaChange = (value) => {
    this.setState({ captchaState: value });
  };
  onrefresh = (value) => {};

  assignUser = (idToken, mail) => {
      this.setState({ data: { idtoken: idToken, email: mail } });
      this.doSubmit();
    
  };

  showAuth = () => {
    this.setState({ auth: true });
  };

  doSubmit = async () => {
    try {
      const { data } = this.state;
      this.setState({ iswaiting: true });
      await auth.login(data);
      const { state } = this.props.location;
      this.setState({ iswaiting: false });
      window.location = state
        ? state.from.pathname
        : `/home?style=${this.state.siteStyle}`;
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
              "email",
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
            <div className="mb-2 ">
              {this.renderButton("Login", this.state.captchaState, undefined)}
            </div>
            <div className="mb-2 ms-auto">
              <ToggleSwitch
                optionLabels={["Style1", "Style2"]}
                checked={this.state.siteStyle}
                onChange={() =>
                  this.setState((prevState) => ({
                    siteStyle: !prevState.siteStyle,
                  }))
                }
                width="100px"
                labelwidth="55px"
                Onbg="#19ba4f"
                Offbg="white"
              />
            </div>
          </div>
          <div className="d-flex flex-row align-items-center space-between">
            <div className="mb-2 ">
              <GoogleLoginComponent assignuser={this.assignUser} />
            </div>
            <div className="mb-2 ms-auto">
              <img
                onClick={this.showAuth}
                src={process.env.PUBLIC_URL + "/images/google64.png"}
                alt="One Tap Login"
                style={{ cursor: "pointer" }}
              ></img>
              {this.state.auth && <UseAuth assignuser={this.assignUser}  />}
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
