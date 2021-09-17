import  {getEndpoint} from "./endPoint";
import http from "./httpService";

//const apiEndpoint = process.env.REACT_APP_URL + "/genres";
const apiEndpoint = getEndpoint() + "/filetransfer";

export  function  getTransfered(data) {
  
  return http.get(apiEndpoint+ "/gettransfered", {
    params:data
  });
  
}
