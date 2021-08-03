import http from "./httpService";
import { getEndpoint } from "./endPoint";

const apiEndpoint = getEndpoint() + "/services";

export function saveService(service) {
  try {
    return http.post(apiEndpoint, service);
  } catch (error) {
    throw error;
  }
}
