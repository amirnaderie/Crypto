import  {getEndpoint} from "./endPoint";
import http from "./httpService";

//const apiEndpoint = process.env.REACT_APP_URL + "/genres";
const apiEndpoint = getEndpoint() + "/genres";

export  function  getGenres() {
  
  return http.get(apiEndpoint);
  
}
