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

export function getServices() {
  try {
    return http.get(apiEndpoint);
  } catch (error) {
    throw error;
  }
}

export function getStatistics() {
  try {
    return http.get(apiEndpoint+"/statistics");
  } catch (error) {
    throw error;
  }
}
export function updateService(service) {
  if (service._id) {
     const body = { ...service };
     delete body._id;
     return http.put(`${apiEndpoint}/${service._id}`, body);
   }
   
 }