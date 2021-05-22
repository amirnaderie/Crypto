import { createSlice } from '@reduxjs/toolkit'
import { getMovies } from "../../services/movieService";

export const initialState = {
  loading: false,
  hasErrors: false,
  movieList: [],
}

// A slice for movies with our three reducers
const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    getmovies: state => {
      state.movieList.splice(0,state.movieList.length);
      state.loading = true
    },
    getmoviesSuccess: (state, { payload }) => {
      state.movieList.push(...payload);
      //state.movieList = payload
      state.loading = false
      state.hasErrors = false
    },
    getmoviesFailure: state => {
      state.loading = false
      state.hasErrors = true
    },
  },
})

// Three actions generated from the slice
export const { getmovies, getmoviesSuccess, getmoviesFailure } = movieSlice.actions

// A selector
//export const moviesSelector = state => state.moviesList

// The reducer
export default movieSlice.reducer

// Asynchronous thunk action
export function fetchMovies() {
  return async dispatch => {
   
    dispatch(getmovies())

    try {
      const {data:response} = await getMovies()
     // const data = await response.json()

      dispatch(getmoviesSuccess(response))
    } catch (error) {
      dispatch(getmoviesFailure())
    }
  }
}