import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getGenres } from "../../services/genreService";

export const fetchGenres = createAsyncThunk('todos/fetchGenres'
, async () => {
    const  {data} =await getGenres();
    const  genres = [{ _id: "", name: "All Genres" },  ...data];  
    return genres;
});

export const genreSlice = createSlice({
  name: 'genres',
  initialState: {
    genreList: [],
    status: 'idle',
    selectedGenre: ''    
  },
  reducers: {
    selectGenre:{
        reducer:(state,action) => {
        const item= action.payload
        state.selectedGenre=item
        }
      }
    },
    extraReducers: {
      [fetchGenres.pending]: (state, action) => {
        state.status = 'loading';
      },
      [fetchGenres.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.genreList.push(...action.payload);
    }
  },
});

// const selectTodoById = (state, todoId) =>
// getTodo().find(todo => todo.id === todoId)

export const { selectGenre } = genreSlice.actions;

export default genreSlice.reducer;
