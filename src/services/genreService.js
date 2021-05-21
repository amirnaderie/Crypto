import http from "./httpService";

const apiEndpoint = process.env.REACT_APP_URL + "/genres";
  
export  function  getGenres() {
  
  return http.get(apiEndpoint);
  
}
