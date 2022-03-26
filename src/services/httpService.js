import axios from "axios";
//import logger from "./logService";


// axios.interceptors.response.use(null, error => {
//   const { response } = error;
//   const expectedError =
//     response &&
//     response.status >= 400 &&
//     response.status < 500;

//   if (expectedError) {
//     if (response.data === "Invalid token.") {
//       localStorage.removeItem("token");
//     }
//     else {
//       logger.log(response);
//       toast.error("An unexpected error occurrred.");
//     }
//   }

//   return Promise.reject(error);
// });
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization =  token ? token: '';
  return config;
});


axios.interceptors.response.use(response => {
  return response;
}, err => {
  return new Promise((resolve, reject) => {
      try {
      const originalReq = err.config;
      if ( err.response.status === 401 && err.config && !err.config.__isRetryRequest )
      {
          originalReq._retry = true;

          let res = fetch(`${process.env.REACT_APP_URL}/auth/refresh`, {
              method: 'POST',
              mode: 'cors',
              cache: 'no-cache',
              credentials: 'same-origin',
              headers: {
                  'Content-Type': 'application/json',
                  'token': localStorage.getItem("token")
              },
              redirect: 'follow',
              referrer: 'no-referrer',
              body: JSON.stringify({
                  token: localStorage.getItem("token"),
                  refreshToken: localStorage.getItem("refreshToken"),
                
              }),
          }).then(res => res.json()).then(res => {
              //console.log(res);
              //this.setSession({token: res.token, refreshToken: res.refreshToken});
              localStorage.setItem("token", res.token);
              localStorage.setItem("refreshToken", res.refreshToken);
              originalReq.headers['Authorization'] = res.token;
              //originalReq.headers['Device'] = "device";


              return axios(originalReq);
          });


          resolve(res);
      }
      resolve(Promise.reject(err));
    } catch (error) {
        throw "Error "
    }
      
  });
});



// function setJwt(jwt) {
//   axios.defaults.headers.common["x-auth-token"] = localStorage.getItem("token");
// }

// function post(apiEndpoint, params) {
//   try {
//     return axios.post(apiEndpoint, params);
//   } catch (error) {
//     throw error;
//   }
// }

// function get(apiEndpoint) {
//   try {
//     const retval= axios.get(apiEndpoint);
//     return retval;
//   } catch (error) {
//     //if (error.response.data === "Invalid token.")
//       //toast.error("Invalid token.");
//     throw error;
//   }

// }

export default {
  get:axios.get,
  post:axios.post,
  put: axios.put,
  delete: axios.delete,
  // setJwt
};
