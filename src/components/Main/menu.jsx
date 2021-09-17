import React, { useState, useEffect,useContext } from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { Collapse } from "react-bootstrap";
import { UserContext } from "../context/Context";
import Profile from "./profile";
//import { fasortasc, fasortdesc } from '@fortawesome/react-fontawesome'
//import { fasortasc,fasortdesc } from '@fortawesome/free-solid-svg-icons'

//import { getMenus } from "../../services/menuService";

const StyledMenu = styled.nav`
  display: flex;
  flex-direction: column;
  // justify-content: right;
  background: #333;
  z-index: 3;
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  height: ${({ Height, Top }) => Height - (Top + 2)}px;
  text-align: right;
  padding: 0.2rem;
  position: fixed;
  top: ${({ Top }) => Top}px;
  right: 0;
  overflow: auto;
  transition: transform 1s ease;
  min-width: 17rem;
  direction:${({ dir }) => dir};

  ul:not(.collapse) {
    list-style-type: none;
    color: #fff;
    margin-top: 10vh;
  }
  .list-unstyled {
    padding: 1rem;
  }
  @media (orientation: landscape) {
    min-height: ${({ Height, Top }) => Height - (Top + 2)}px;
  }

  @media (max-width: 576px) {
    width: 100%;
  }

  .active {
    color: yellow;
  }

  a {
    font-size: 1rem;
    padding: 1rem 0;
    // font-weight: bold;
    // letter-spacing: 0.5rem;
    line-height: 3;
    color: #fff;
    text-decoration: none;
    transition: color 0.3s linear;

    &:hover {
      color: #fff;
    }
  }
`;

const Menu = ({ open, menus, setOpen }) => {
  const { dimensions } = useContext(UserContext);
  const [menu, setMenu] = useState([]);
 
  //const [menus, setMenus] = useState([]);
  //const [opencol, setOpencol] = useState(false);

  useEffect(() => {
    try {
      setMenu(
        menus
          .filter((item) => item["component"] === "" && item["url"] === "")
          .map((v) => ({ ...v, isshow: false }))
      );
    } catch (error) {}
  }, [menus]);

  return (
    <div>
    <StyledMenu open={open} Height={dimensions.height} dir="rtl" Top={53}>
      <Profile/>

      <ul className="mx-1">
        {menus !== undefined &&
          // menu.length !== 0 &&
          menus.map((item) => {
            return item["url"] !== "" && item["parentId"] === 0 ? (
              <li key={item["_id"]}>
                <NavLink
                  activeClassName="active"
                  onClick={() => setOpen(!open)}
                  to={item["url"]}
                >
                  {item["label"]}
                </NavLink>
              </li>
            ) : item["parentId"] === 0 ? (
              <li key={item["_id"]}>
                <a
                  onClick={() => {
                    const MenuT = [...menu];
                    const index = MenuT.findIndex(
                      (obj) => obj.id === item["id"]
                    );
                    MenuT[index] = { ...MenuT[index] };
                    MenuT[index].isshow = !MenuT[index].isshow;
                    setMenu(MenuT);
                  }}
                  role="button"
                  aria-controls={item["id"]}
                  aria-expanded={
                    menus !== undefined &&
                    menu.length !== 0 &&
                    menu[menu.findIndex((obj) => obj.id === item["id"])].isshow
                  }
                >
                  {item["label"]}
                  {
                    <i
                      className={
                        menus !== undefined &&
                        menu.length !== 0 &&
                        menu[menu.findIndex((obj) => obj.id === item["id"])]
                          .isshow === true
                          ? "fa fa-sort-asc m-2 "
                          : "fa fa-sort-asc m-2 show"
                      }
                    />
                  }
                </a>
                <Collapse
                  in={
                    menus !== undefined &&
                    menu.length !== 0 &&
                    menu[menu.findIndex((obj) => obj.id === item["id"])].isshow
                  }
                >
                  <div
                    // className={
                    //   "collapse list-unstyled " +
                    //   menu[menu.findIndex((obj) => obj.id === item["id"])].isshow
                    // }
                    id={item["id"]}
                  >
                    {menus
                      .filter((menu) => menu["parentId"] === item["id"])
                      .map((subitem) => (
                        <li key={subitem["_id"]} className="submenuMargin">
                          <NavLink
                            activeClassName="active"
                            onClick={() => setOpen(!open)}
                            to={subitem["url"]}
                          >
                            {subitem["label"]}
                          </NavLink>
                        </li>
                      ))}
                  </div>
                </Collapse>
              </li>
            ) : null;
          })}
        {/* <a href="/">
        <span role="img" aria-label="about us">💁🏻‍♂️</span>
        About us
      </a>
      <a href="/">
        <span role="img" aria-label="price">💸</span>
        Pricing
        </a>
      <a href="/">
        <span role="img" aria-label="contact">📩</span>
        Contact
        </a> */}
      </ul>
    </StyledMenu>
    </div>
  );
};

export default Menu;
