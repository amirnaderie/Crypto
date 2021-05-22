import React from 'react';
import TrackList from "./TrackList";
import PlayerControls from './playerControls';
//import './index.css'

function MusicForm() {
  return (
       <div className="container">
        <TrackList />
        <PlayerControls /> 
      </div>
  );
}

export default MusicForm;