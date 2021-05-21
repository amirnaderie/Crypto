import http from "./httpService";


const apiEndpoint = process.env.REACT_APP_URL + "/movies";

function movieUrl(id) {
  return `${apiEndpoint}/${id}`;
}

export function getMovies() {
  return http.get(apiEndpoint);
}

export function getMovie(movieId) {
  return http.get(movieUrl(movieId));
}

export function saveMovie(movie) {
 try {
  if (movie._id) {
    const body = { ...movie };
    delete body._id;
    return http.put(movieUrl(movie._id), body);
  }

  return http.post(apiEndpoint, movie); 
 } catch (error) {
   throw error;
 } 
  
}

export function deleteMovie(movieId) {
  return http.delete(movieUrl(movieId));
}
