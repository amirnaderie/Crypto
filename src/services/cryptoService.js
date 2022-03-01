import { finguard } from "../utils/utilities";
import  {getEndpoint} from "./endPoint";
import http from "./httpService";
const Id=finguard().toString().replaceAll('.','')
const apiEndpoint = getEndpoint() + "/cryptos?id="+ Id;

export  function  getCryptos() {
  
  return http.get(apiEndpoint);
  
}
