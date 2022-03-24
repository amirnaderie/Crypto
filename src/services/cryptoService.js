import { finguard } from "../utils/utilities";
import { getEndpoint } from "./endPoint";
import http from "./httpService";
const Id = finguard().toString().replaceAll(".", "");
const apiEndpoint = getEndpoint()+ "/cryptos" ;

export function getCryptos() {
  try {
  return http.get(apiEndpoint + "?id=" + Id);
} catch (error) {
  throw error;
}
}

export function saveCrypto(crypto) {
  try {
    return http.post(apiEndpoint, crypto);
  } catch (error) {
    throw error;
  }
}
export function deleteCrypto(id) {
    try {
      return http.delete(`${apiEndpoint}/${id}`);
    } catch (error) {
      throw error;
    }

}
