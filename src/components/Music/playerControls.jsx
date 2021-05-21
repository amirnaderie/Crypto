import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPause, faPlay, faStepBackward, faStepForward} from "@fortawesome/free-solid-svg-icons";
import {togglePlay,playPreviousTrack,playNextTrack } from "../../redux/slices/musicsSlice"
import { connect } from "react-redux"

const PlayerControls=(props)=> {
  const { isPlaying, currentTrackName, togglePlay, playPreviousTrack, playNextTrack } = props;
  return (
  
      <div className="box controls has-background-grey-dark">
        {/* <div className="current-track has-text-light">
          <marquee>{currentTrackName}</marquee>
        </div> */}
        <div>
          <button className="button has-text-light has-background-grey-dark" onClick={playPreviousTrack} disabled={!currentTrackName}>
            <FontAwesomeIcon icon={faStepBackward} />
          </button>
          <button className="button has-text-light has-background-grey-dark" onClick={togglePlay} disabled={!currentTrackName}>
            {isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
          </button>
          <button className="button has-text-light has-background-grey-dark" onClick={playNextTrack} disabled={!currentTrackName}>
            <FontAwesomeIcon icon={faStepForward} />
          </button>
        </div>
      </div>
    
  )
}
const mapStateToProps = state => ({
    isPlaying: state.musics.isPlaying,
    currentTrackName: state.musics.currentTrackName,
  })
  
  export default connect(mapStateToProps, {playNextTrack,togglePlay,playPreviousTrack})(PlayerControls)
  

