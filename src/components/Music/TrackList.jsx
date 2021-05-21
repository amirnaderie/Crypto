import React,{useEffect} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
import {playTrack,fetchTracks } from "../../redux/slices/musicsSlice"
import { connect } from "react-redux"
const TrackList = ({trackList,apiStatus,currentTrackName
  ,fetchTracks,playTrack,isPlaying}) => {
    
  useEffect(() => {
    if (apiStatus === 'idle') {
      fetchTracks();
    }
  }, [apiStatus]);
  
  return (
    <ul className="list-group">
    
      {apiStatus === 'succeeded' && trackList.map((track, index) => (
        <div className="box" key={index}>
          <button className="button" onClick={() => playTrack(index)}>
            {currentTrackName === track.name && isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>
          <div className="song-title">
            {track.name}
          </div>
        </div>
      ))} 
     </ul>
  )
}


const mapStateToProps = state => ({
  trackList: state.musics.trackList,
  apiStatus: state.musics.status,
  isPlaying: state.musics.isPlaying,
  currentTrackName: state.musics.currentTrackName,
})

export default connect(mapStateToProps, {fetchTracks,playTrack})(TrackList)


