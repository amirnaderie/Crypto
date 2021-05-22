import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import 'bootstrap/dist/css/bootstrap.min.css';
import "font-awesome/css/font-awesome.css";
import { Provider } from 'react-redux';
import store from './redux/store/index';

console.log('AMIR', process.env.REACT_APP_ENV);
ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
</Provider>
</React.StrictMode>,
  document.getElementById("root")
);
registerServiceWorker();
