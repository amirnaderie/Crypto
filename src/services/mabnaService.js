import  {getEndpoint}  from "./endPoint";
import http from "./httpService";

const apiEndpoint = getEndpoint()+ "/mabnas";
  
export function  getBrands() {
  try {
    
    return http.get(apiEndpoint + "/brand" );
  } catch (error) {
     const retval=[];
     return  retval;
  }
}
export function  getModels(value) {
  try {
    
    return http.get(apiEndpoint + "/model", {
      params: {
        othervalue: value
      }});
  } catch (error) {
     const retval=[];
     return  retval;
  }
}

export function  getTimes() {
  try {
     return http.get(apiEndpoint + "/time");
  } catch (error) {
     const retval=[];
     return  retval;
  }
}

export function  getServiceTypes() {
  try {
     return http.get(apiEndpoint + "/servicetype");
  } catch (error) {
     const retval=[];
     return  retval;
  }
}


