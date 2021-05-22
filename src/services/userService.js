import http from "./httpService";


const apiEndpoint = process.env.REACT_APP_URL + "/users";

export function register(user) {
  return http.post(apiEndpoint, {
    email: user.username,
    password: user.password,
    name: user.name
  });
}
