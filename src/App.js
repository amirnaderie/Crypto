import React, { Component } from "react";
//import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Movies from "./components/movies";
// import MovieForm from "./components/movieForm";
// import Customers from "./components/customers";
// import Rentals from "./components/rentals";
// import NotFound from "./components/notFound";
// import NavBar from "./components/navBar";
// import LoginForm from "./components/loginForm";
// import RegisterForm from "./components/registerForm";
// import Logout from "./components/logout";
// import ProtectedRoute from "./components/common/protectedRoute";
// import MusicForm from "./components/Music/musicForm"
//import auth from "./services/authService";
//import Joi from "joi-browser";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import MainForm from './components/Main/MainForm';


class App extends Component {
  state = {};

  // componentDidMount() {
  //   const user = auth.getCurrentUser();
  //   this.setState({ user });
  // }

  render() {
    // const { user } = this.state;

    return (
      <React.Fragment>
    
        <MainForm/>
       {/* for persian 
        <ToastContainer rtl /> */}
      
      <ToastContainer />
      
        {/* <NavBar user={user} />
        <main className="container">
          <Switch>
            <Route path="/register" component={RegisterForm} />
            <Route path="/login" component={LoginForm} />
            <Route path="/logout" component={Logout} />
            <ProtectedRoute path="/movies/:id" component={MovieForm} />
            <Route
              path="/movies"
              render={props => <Movies {...props} user={this.state.user} />}
            />
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <ProtectedRoute path="/music" component={MusicForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/login" />
            <Redirect to="/not-found" />
          </Switch>
        </main>  */}
      </React.Fragment>
    );
  }
}

export default App;
