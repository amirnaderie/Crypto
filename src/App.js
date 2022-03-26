import React, { Component } from "react";
import { ToastContainer } from "react-toastify";
import "./App.css";
import CryptoForm from "./components/crypto/CryptoForm";

import "react-toastify/dist/ReactToastify.css";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <CryptoForm />
        <ToastContainer />
      </React.Fragment>
    );
  }
}

export default App;
