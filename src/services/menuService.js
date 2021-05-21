import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_URL + "/menus";
  
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

