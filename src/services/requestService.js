import http from "./httpService";
import { getEndpoint } from "./endPoint";

const apiEndpoint = getEndpoint() + "/requests";

export function saveRequest(request) {
  try {
    return http.post(apiEndpoint, request);
  } catch (error) {
    throw error;
  }
}
