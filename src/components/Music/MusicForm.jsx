import React,{useState} from "react";
import TrackList from "./TrackList";
import PlayerControls from "./playerControls";
import './music.css'

function MusicForm() {
  const [showCookiesMessage, setshowCookiesMessage] = useState(true)
  const hidediv=()=>{
    setshowCookiesMessage(false);
  }
  return (
    <div className="container">
      <TrackList />
      <PlayerControls />
      {showCookiesMessage && <div
        id="wsMsgWnd"
        className="wsMsgWnd Important Shown"
        msgid="cookie-info-2021"
        data-hide-on-action="true"
      >
        <div className="CloseButton" onClick={hidediv}></div>
        <div className="r-container">
          <div className="Content">
            <div className="Title">Why We Use Cookies</div>
            <div className="Text">
              This site uses cookies to make your browsing experience more
              convenient and personal. Cookies store useful information on your
              computer to help us improve the efficiency and relevance of our
              site for you. In some cases, they are essential to making the site
              work properly. By accessing this site, you consent to the use of
              cookies. For more information, refer to DevExpress’{" "}
              <a
                href=""
                rel="noopener noreferrer"
                target="_blank"
              >
                privacy policy
              </a>{" "}
              and{" "}
              <a
              rel="noopener noreferrer"
                href=""
                target="_blank"
              >
                cookie policy
              </a>
              .
            </div>
          </div>
          <div className="Button">
            <a  onClick={e => {e.preventDefault(); }}>I Understand</a>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default MusicForm;
