import React, { useState, useContext } from "react";
import { useGoogleOneTapLogin } from "react-google-one-tap-login";
import { getClientID } from "../../../services/authService";
//////////////////
// custom Hooks in React 
//////////////////
const CLIENT_ID =getClientID();

const UseAuth = ({assignuser}) => {
 
  
  useGoogleOneTapLogin({
    onSuccess: (response) => assignuser(response.name, response.email),
    onError: (error) => console.log(error),
    googleAccountConfigs: {
      client_id:CLIENT_ID,
      
    },
  });
   return "";
};

export default UseAuth;
