import  {getEndpoint}  from "./endPoint";
import http from "./httpService";

const apiEndpoint = getEndpoint()+ "/menus";
  
export function  getMenus() {
  try {
    
    return http.get(apiEndpoint);
  } catch (error) {
     const retval=[];
     return  retval;
  }
}

export default {
  getMenus
};

