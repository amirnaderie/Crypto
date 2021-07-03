import React, { useState, useEffect } from "react";
//import styled, { css } from 'styled-components';
import { Route, Redirect, Switch, Link } from "react-router-dom";

import NotFound from "../notFound";
//import NavBar from "../navBar";
import LoginForm from "../loginForm";
import Logout from "../logout";
import ProtectedRoute from "../common/protectedRoute";

import auth from "../../services/authService";
import { getMenus } from "../../services/menuService";

import Burger from "./burger";
import Menu from "./menu";
import { sortItems } from "../../utils/paginate";
import "./mainStyle.css";

const MainForm = () => {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(auth.getCurrentUser());
  const [menus, setmenus] = useState([]);
  const [urls, seturls] = useState([]);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });
  useEffect(() => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }
    window.addEventListener("resize", handleResize);
    try {
      if (window.location.pathname === "/login") {
        setUser(null);
        setmenus([]);
        return;
      }
      if (user !== null) {
        getMenus()
          .then((result) => {
            if (result) {
              try {
                const data = sortItems(result.data, "id", "asc");
                seturls(data);
                data
                  .filter((item) => item["component"] !== "")
                  .map((plugin) => {
                    import(`../${plugin["path"]}`).then((module) => {
                      setmenus((oldArray) => [
                        ...oldArray,
                        { ...plugin, component: module.default },
                      ]);
                    });
                  });
              } catch (err) {
                console.error(err.toString());
              }
            }
          })
          .catch((err) => {
            if (
              err.message.includes("nexpected") ||
              err.message.includes("undefined")
            ) {
              setUser(null);
              auth.logout();
              window.location = "/login";
            }
          });
      } else {
        if (!window.location.pathname.includes("login"))
          window.location = "/login";
      }
    } catch (error) {
      // if(error==='login')
      //  window.location = "/login";
      if (error.message.includes("Unexpected token"))
        console.log("khata", error);
    }
  }, []);

  return (
    <div className="wrapper ">
      <div className="content float-right ">
        
            {user !== "undefined" && user !== null && menus !== undefined && menus.length !== 0 && (
           <div><Burger open={open} setOpen={setOpen} />
          
              <div className="dropdown-content">
                <a>{user !== null && `نام کاربر: ${user.name}`}</a>
                <li></li>
                <a>
                  {(window.screen.orientation || {}).type ||
                    window.screen.mozOrientation ||
                    window.screen.msOrientation}
                </a>
                <a>
                  {window.screen.orientation.angle ? "landscape" : "portrait"}
                </a>
                <a>{!!navigator.maxTouchPoints ? "mobile" : "computer"}</a>
              </div>
           
            
              <div className="pb-1 mb-1 border-bottom text-center">
                <a href="tel:+989125758468">
                  <i
                    aria-hidden="true"
                    className=" fa fa-phone-square text-info fa-2x pull-left m-1"
                  ></i>
                </a>
                <Link to="/not-found">
                  <img
                    src={process.env.PUBLIC_URL + "/images/flowers32.png"}
                    alt="Site Logo"
                  />
                </Link>
              </div>
              </div>
            )}
         <div>
            <Switch>
              {menus !== undefined &&
                menus.length !== 0 &&
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
                      <ProtectedRoute
                        key={id}
                        path={url}
                        component={Component}
                      />
                    )
                  )}

              {/* <ProtectedRoute path="/register" component={RegisterForm} />
     <ProtectedRoute path="/movies/:id" component={MovieForm} />
     <ProtectedRoute path="/customers" component={Customers} />
      <ProtectedRoute path="/rentals" component={Rentals} />
      <ProtectedRoute path="/music" component={MusicForm} /> */}

              <Route path="/logout" component={Logout} />
              {/* <Route
        path="/movies"
        render={props => <Movies {...props} user={user} />}
      /> */}
              <Route path="/login" component={LoginForm} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/login" />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        
      </div>
      <div>
        <Menu Height={dimensions.height} open={open} menus={urls} setOpen={setOpen} user={user} />
      </div>
    </div>
  );
};

// ReactDOM.render(<App />, document.getElementById('app'));

// const useOnClickOutside = (ref, handler) => {
//   React.useEffect(() => {
//     const listener = event => {
//       if (!ref.current || ref.current.contains(event.target)) {
//         return;
//       }
//       handler(event);
//     };
//     document.addEventListener('mousedown', listener);

//     return () => {
//       document.removeEventListener('mousedown', listener);
//     };
//   },
//   [ref, handler],
//   );
// };

export default MainForm;
