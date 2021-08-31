import React,{useContext} from "react";
import { UserContext } from "../context/Context";
const Profile = () => {
    const { user } = useContext(UserContext);
    return (
      <div className="dropdown m-3" style={{ position: "fixed", left: 0 }}>
      <button className="dropbtn">
        <span className="user">
          <i className="fa fa-user"></i>
        </span>{" "}
      </button>
      <div className="dropdown-content">
        <a>{user && `نام کاربر: ${user.name}`}</a>
        <li></li>
        <a>
          {(window.screen.orientation || {}).type ||
            window.screen.mozOrientation ||
            window.screen.msOrientation}
        </a>
        <a>{window.screen.orientation.angle ? "landscape" : "portrait"}</a>
        <a>{!!navigator.maxTouchPoints ? "mobile" : "computer"}</a>
      </div>
    </div>

        
      );
}
 

export default Profile;

