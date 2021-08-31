import React,{useContext} from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomeForm from "../HomeForm";
import LoginForm from "../loginForm";
import Logout from "../logout";
import { UserContext } from "../context/Context";
import ProtectedRoute from "../common/protectedRoute";

const CustomSwitch = ({ menus }) => {
    const { user } = useContext(UserContext);
    return (
    <div className="position-relative justify-content-center align-items-center" style={{top: '23px'}}>
     <Switch>
        {menus &&
          menus
            .filter((item) => item["component"] !== "")
            .map(({ id, url, needPassParams, component: Component }) =>
              needPassParams === true ? (
                <Route
                  key={id}
                  path={url}
                  render={(props) => <Component {...props} user={user} />}
                />
              ) : (
                <ProtectedRoute key={id} path={url} component={Component} />
              )
            )}
        <Route path="/logout" component={Logout} />
        <Route path="/login" component={LoginForm} />
        <Route path="/home" component={HomeForm} />
        <Redirect from="/" exact to="/login" />
        <Redirect to="/home" />
      </Switch>
    
    </div>
  );
};

export default CustomSwitch;
