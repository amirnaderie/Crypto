import  {getEndpoint}  from "./endPoint";
import http from "./httpService";

const apiEndpoint = getEndpoint()+ "/mabnas";
  
export function  getMabnas(mabnaName) {
  try {
    
    return http.get(apiEndpoint + "/" + mabnaName);
  } catch (error) {
     const retval=[];
     return  retval;
  }
}

