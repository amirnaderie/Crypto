import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {getinboxcount } from '../../services/filetransferService';

export const initialState = {
  inboxCount: 0
}
export const mainSlice = createSlice({
  name: 'mains',
  initialState,
  reducers: {
    updateInbox:(state, action) =>{
        (action.payload === 'Inc' ? state.inboxCount++ : state.inboxCount--);
    },
    getCountSuccess: (state, { payload }) => {
      state.inboxCount=payload.count;
    },
     
    }
  
})


export const { updateInbox,getCountSuccess } = mainSlice.actions;

export default mainSlice.reducer;

// Asynchronous thunk action
export function getInboxCount(id) {
  return async dispatch => {
   
   
    try {
      const {data:response} = await getinboxcount(id)
     // const data = await response.json()

      dispatch(getCountSuccess(response))
    } catch (error) {
     
    }
  }
}
