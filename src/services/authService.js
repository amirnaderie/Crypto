import jwtDecode from "jwt-decode";
import http from "./httpService";
import {getEndpoint} from "./endPoint";

const apiEndpoint = getEndpoint() + "/auth";
const tokenKey = "token";
const refreshTokenKey = "refreshToken";

// http.setJwt(getJwt());

export async function login(email, password) {
  try {
    const { data: jwt, } = await http.post(apiEndpoint, { email, password });
    localStorage.setItem(tokenKey, jwt.token);
    localStorage.setItem(refreshTokenKey, jwt.refreshToken);  
  } catch (error) {
    throw error;
  }
  
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    
    return (jwt===null|| jwt==="undefined")?null:jwtDecode(jwt);
  } catch (ex) {
     throw ex.message.includes('Invalid');//?'login': null;
     
  }
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt
};
