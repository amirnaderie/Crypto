import { finguard } from "../utils/utilities";
import { getEndpoint } from "./endPoint";
import http from "./httpService";
const Id = finguard().toString().replaceAll(".", "");
const apiEndpoint = getEndpoint()+ "/cryptos" ;

export function getCryptos() {
  return http.get(apiEndpoint + "?id=" + Id);
}

export function SaveCrypto(crypto) {
  try {
    return http.post(apiEndpoint, crypto);
  } catch (error) {
    throw error;
  }
}
