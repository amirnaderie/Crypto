import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';
import genreReducer from '../slices/moviesCategorySlice';
import movieReducer from '../slices/moviesSlice';
import musicReducer from '../slices/musicsSlice';
import mainReducer from '../slices/mainsSlice';

export default configureStore({
  reducer: {
    genres:genreReducer ,
    movies:movieReducer,
    musics:musicReducer,
    mains:mainReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});
