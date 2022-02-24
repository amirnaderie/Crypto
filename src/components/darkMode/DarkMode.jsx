import "./DarkMode.css";
import React, {
  ChangeEventHandler,
  Fragment,
  useEffect,
  useState,
} from "react";
import ToggleSwitch from "./../common/toggle/ToggleSwitch";

const DarkMode = () => {
  const [storedTheme, setStoredTheme] = useState("");
  const [checkstate, setCheckstate] = useState(false);
  /* NEW (START) */
  const setDark = () => {
    localStorage.setItem("theme", "dark");
    const html = document.querySelector("html");
    html.setAttribute("data-theme", "dark");
    setStoredTheme("dark");
  };

  const setLight = () => {
    localStorage.setItem("theme", "light");
    document.documentElement.setAttribute("data-theme", "light");
    setStoredTheme("light");
  };

  const toggleTheme = () => {
    setCheckstate(!checkstate);
    if (storedTheme == "light") {
      setDark();
    } else {
      setLight();
    }
  };
  /* NEW (END) */

  useEffect(() => {
    const storetheme = localStorage.getItem("theme");
    setStoredTheme(storetheme);

    if (storetheme == "dark") {
      setDark();
      setCheckstate(true);
    } else {
      setLight();
      setCheckstate(false);
    }
  }, []);
  return (
    <Fragment>
      <div className="toggle-theme-wrapper">
        <span>☀️</span>
        <label className="toggle-theme" htmlFor="checkbox">
          <input
            type="checkbox"
            id="checkbox"
            // NEW
            onChange={toggleTheme}
            defaultChecked={checkstate}
          />
          <div className="slider round"></div>
        </label>
        <span>🌒</span>
      </div>
      <div>
        <ToggleSwitch
          optionLabels={["dark", "light"]}
          checked={checkstate}
          onChange={toggleTheme}
          width="100px"
          labelwidth="55px"
          Onbg="#19ba4f"
          Offbg="white"
        />
      </div>
      <div className="profile-card">
        <div className="info">
          <h2>John Doe</h2>
          <p>Ceo / Founder</p>
        </div>
      </div>
    </Fragment>
  );
};

export default DarkMode;
