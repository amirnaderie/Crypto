import React, { useState,useContext } from "react";
import { GoogleLogin, GoogleLogout } from "react-google-login";
import { getClientID } from "../../../services/authService";
import "./googlebutton.css"

const CLIENT_ID =getClientID();
  

 const GoogleLoginComponent =({assignuser})=> {
  
  const  [isLoggedIn,setIsLoggedIn]=useState(false);
  
  
  
  // Success Handler
  const responseGoogleSuccess = (response) => {
    ///saveidToken(response.tokenId);
    setIsLoggedIn(false);
    assignuser(response.tokenId,response.profileObj.email);
   
  };

  // Error Handler
  const responseGoogleError = (response) => {
    console.log(response);
  };

  // Logout Session and Update State
  const logout = (response) => {
    assignuser("");
    setIsLoggedIn(false);
  };

  
    return (
      <div className="row ">
        <div className="col-md-12 googlebutton">
          {isLoggedIn ? (
            <div>
              
              <GoogleLogout
                clientId={CLIENT_ID}
                buttonText={"Logout"}
                onLogoutSuccess={logout}
              ></GoogleLogout>
            </div>
          ) : (
            <GoogleLogin
              clientId={CLIENT_ID}
              buttonText=""
              onSuccess={responseGoogleSuccess}
              onFailure={responseGoogleError}
              // isSignedIn={true}  For Auto Login
              cookiePolicy={"single_host_origin"}
            />
          )}
        </div>
      </div>
    );
 
}
export default GoogleLoginComponent;