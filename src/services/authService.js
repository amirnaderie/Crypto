import jwtDecode from "jwt-decode";
import http from "./httpService";
// import io from "socket.io-client"


const apiEndpoint = process.env.REACT_APP_URL + "/auth";
const tokenKey = "token";
const refreshTokenKey = "refreshToken";

// http.setJwt(getJwt());

export async function login(inp) {
  try {
    const { data: jwt } = await http.post(apiEndpoint, {email:inp.email,password:inp.password,idtoken:inp.idtoken });
    localStorage.setItem(tokenKey, jwt.token);
    localStorage.setItem(refreshTokenKey, jwt.refreshToken);
         
  } catch (error) {
    throw error;
  }
  
}

export function getClientID()
{
   //this client id is for google sign in
  return "1032600424978-mlij88vle420270inou5tv98eig3aop6.apps.googleusercontent.com";
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(refreshTokenKey);
  
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

export function makeSocketConnection()
{
  //return io('http://localhost:3901',{auth: {    token:localStorage.getItem(tokenKey) }})
  return null
}

export default {
  login,
  loginWithJwt,
  logout,
  getCurrentUser,
  getJwt,
  makeSocketConnection
};
