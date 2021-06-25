import http from "./httpService";
import  {getEndpoint}  from "./endPoint";

const apiEndpoint = getEndpoint() + "/tracks";
  
export  function  getTracks() {
  
  return http.get(apiEndpoint);
  
}
