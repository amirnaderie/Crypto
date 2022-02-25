import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import Menu from "./menu";
import CustomHeader from "./customHeader";
import CustomSwitch from "./customSwitch";

import auth from "../../services/authService";
// import auth, { makeSocketConnection } from "../../services/authService";

import { getMenus } from "../../services/menuService";
import { sortItems } from "../../utils/paginate";
import { UserContext } from "../context/Context";
import "./mainStyle.css";
import Navbar from "./Alt/Navbar";
import { Fragment } from "react";

const MainForm = () => {
  const [open, setOpen] = useState(false);
  const [mainstyle, setMainStyle] = useState(false);
  const [user, setUser] = useState(auth.getCurrentUser());
  const [menus, setmenus] = useState([]);
  const [urls, seturls] = useState([]);
  const [dimensions, setDimensions] = React.useState({
    height: window.innerHeight,
    width: window.innerWidth,
    // mainheight:(window.innerHeight-90)
  });
  const [socket, setSocket] = useState(null);
 // const [socketConnected, setSocketConnected] = useState(false);
  const [newFileRec, setNewFileRec] = useState(null);

  useEffect(() => {
   // setSocket(makeSocketConnection());

    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
        // mainheight:(window.innerHeight-90)
      });
    }
    window.addEventListener("resize", handleResize);
    useQuery();
    try {
      if (window.location.pathname === "/login") {
        setUser(null);
        setmenus([]);
        return;
      }
      if (user !== null) {
        getMenus()
          .then((result) => {
            if (result) {
              try {
                const data = sortItems(result.data, "id", "asc");
                seturls(data);
                data
                  .filter((item) => item["component"] !== "")
                  .map((plugin) => {
                    return import(`../${plugin["path"]}`).then((module) => {
                      setmenus((oldArray) => [
                        ...oldArray,
                        { ...plugin, component: module.default },
                      ]);
                    });
                  });
              } catch (err) {
                console.error(err.toString());
              }
            }
          })
          .catch((err) => {
            if (
              err.message.includes("nexpected") ||
              err.message.includes("undefined")
            ) {
              setUser(null);
              auth.logout();
              window.location = "/login";
            }
          });
      } else {
        if (!window.location.pathname.includes("login"))
          window.location = "/login";
      }
    } catch (error) {
      if (error.message.includes("Unexpected token"))
        console.log("khata", error);
    }
  }, []);

  // subscribe to the socket event
  // useEffect(() => {
  //   if (!socket) return;

  //   if (user) {
  //     socket.on("connect", () => {
  //       setSocketConnected(socket.connected);
  //       //socket.emit("join", { name: user.name });
  //     });

  //     socket.on("connect_error", (err) => {
  //       if (user)
  //         toast.success("connection to socket is faild", {
  //           position: toast.POSITION.TOP_LEFT,
  //         });
  //     });

  //     socket.on("disconnect", () => {
  //       setSocketConnected(socket.connected);
  //     });
  //   }
  // }, [socket]);

 
  function useQuery() {
    if (window.location.search !== "") {
      const MySyle =
        new URLSearchParams(window.location.search).get("style") === "true";
      setMainStyle(MySyle);
      localStorage.setItem("style", MySyle);
    } else setMainStyle(localStorage.getItem("style") === "true");
  }
  return (
    <div className="container-fluid">
      <UserContext.Provider value={{ user, dimensions, socket, newFileRec }}>
        {mainstyle && (
          <Fragment>
            <CustomHeader open={open} setOpen={setOpen} />
            <CustomSwitch menus={menus} />
            <Menu open={open} menus={urls} setOpen={setOpen} />
          </Fragment>
        )}
        {!mainstyle && (
          <Fragment>
            <Navbar menus={urls} socket={socket} user={user} />
            <CustomSwitch menus={menus} />
          </Fragment>
        )}
      </UserContext.Provider>
    </div>
  );
};

export default MainForm;
