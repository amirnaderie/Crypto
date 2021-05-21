import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_URL + "/tracks";
  
export  function  getTracks() {
  
  return http.get(apiEndpoint);
  
}
