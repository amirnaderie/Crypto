import { createSlice } from "@reduxjs/toolkit"
// import LostChameleon from '../../assets/LostChameleon.mp3';
// import Rock from '../../assets/TheHipsta.mp3';
// import Tobu from '../../assets/Tobu.mp3';
import { getTracks } from "../../services/trackService";

export const initialState = {
   // audioPlayer: new Audio(),
    trackList: [],
    currentTrackIndex: null,
    currentTrackName:'',
    isPlaying: false,
    status: 'idle',
    
  }
const musicSlice = createSlice({
  name: "musics",
  initialState,
  reducers: {
    playTrack: (state, action) => {
      if (action.payload === state.currentTrackIndex) {
        musicSlice.caseReducers.togglePlay(state) ;
      } else {
     //   state.audioPlayer.pause();
     //   state.audioPlayer = new Audio(state.trackList[action.payload].file);
     //   state.audioPlayer.play();
        
        state.currentTrackIndex=action.payload;
        state.currentTrackName= state.currentTrackIndex !== null && state.trackList[action.payload].name;
        state.isPlaying=true;
      }

    },
    togglePlay: state => {
        // if (state.isPlaying) {
        //     state.audioPlayer.pause();
        //   } else {
        //     state.audioPlayer.play();
        //   }
          state.isPlaying=!state.isPlaying;
    },
    playPreviousTrack: state => {
        const idx = ((state.currentTrackIndex + -1) % state.trackList.length + state.trackList.length) % state.trackList.length;
        musicSlice.caseReducers.playTrack(state,{payload:idx});
    },
    playNextTrack: state => {
        const idx = (state.currentTrackIndex + 1) % state.trackList.length;
        musicSlice.caseReducers.playTrack(state,{payload:idx});
    },
    gettracks: state => {
      state.status = 'loading';
      
      },
      gettrackstuccess: (state, { payload }) => {
        state.trackList.push(...payload);
        state.status = 'succeeded';
        
      },
      gettracksfailure: state => {
        state.status = 'faild';
       
      },

  }
})

export const {
    gettracks,
    gettrackstuccess,
    gettracksfailure,
    playTrack,
    togglePlay,
    playPreviousTrack,
    playNextTrack,
 } = musicSlice.actions

export default musicSlice.reducer

export function fetchTracks() {
  return async dispatch => {
   
    dispatch(gettracks())

    try {
      const {data:response} = await getTracks()
     // const data = await response.json()

      dispatch(gettrackstuccess(response))
    } catch (error) {
      dispatch(gettracksfailure())
    }
  }
}