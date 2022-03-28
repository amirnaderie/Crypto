import { finguard } from "../utils/utilities";
import http from "./httpService";
const Id = finguard().toString().replaceAll(".", "");
const apiEndpoint = process.env.REACT_APP_URL + "/cryptos";

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
