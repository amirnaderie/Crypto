import http from "./httpService";


const apiEndpoint = process.env.REACT_APP_URL + "/userroles";

export function register(userrole) {
  return http.post(apiEndpoint, {
    email: userrole.username,
    password: userrole.password,
    name: userrole.name
  });
}
