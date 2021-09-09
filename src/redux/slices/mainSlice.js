import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const initialState = {
    user: false
   }
export const mainSlice = createSlice({
  name: 'mains',
  initialState,
  reducers: {
    updateUser:{
        reducer:(state,action) => {
        const item= action.payload
        state.user=item
        }
      }
    }
});


export const {updateUser } = mainSlice.actions;

export default mainSlice.reducer;
