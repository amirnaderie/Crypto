import http from "./httpService";
import { getEndpoint } from "./endPoint";

const apiEndpoint = getEndpoint() + "/users";

export function getUser() {
  try {
    return http.post(apiEndpoint+ "/getUser", {"usertype":2 });
  } catch (error) {
    throw error;
  }
}

//const apiEndpoint = process.env.REACT_APP_URL + "/userroles";

export function register(userrole) {
  return http.post(apiEndpoint, {
    email: userrole.username,
    password: userrole.password,
    name: userrole.name
  });
}
