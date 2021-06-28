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
                href="https://www.devexpress.com/AboutUs/privacy-policy.xml"
                target="_blank"
              >
                privacy policy
              </a>{" "}
              and{" "}
              <a
                href="https://www.devexpress.com/AboutUs/cookie-policy.xml"
                target="_blank"
              >
                cookie policy
              </a>
              .
            </div>
          </div>
          <div className="Button">
            <a href="javascript:;" onClick={hidediv}>I Understand</a>
          </div>
        </div>
      </div>}
    </div>
  );
}

export default MusicForm;
