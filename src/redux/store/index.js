import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import genreReducer from '../slices/moviesCategorySlice';
import movieReducer from '../slices/moviesSlice';
import musicReducer from '../slices/musicsSlice';

export default configureStore({
  reducer: {
    genres:genreReducer ,
    movies:movieReducer,
    musics:musicReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
