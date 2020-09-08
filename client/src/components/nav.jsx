import React, { useContext } from "react";
import PopUpContext from "../utils/context";
import "./styles/nav.scss";

const Nav = () => {
  const { context, changeContext } = useContext(PopUpContext);
  const _changeActive = (n) => {
    changeContext({
      ...context,
      active: n,
    });
  };
  return (
    <nav>
      <ul className="navList">
        <li
          className={
            context.active === 1 ? "navList--item active" : "navList--item"
          }
          onClick={() => _changeActive(1)}
        >
          Search
        </li>
        <li
          className={
            context.active === 2 ? "navList--item active" : "navList--item"
          }
          onClick={() => _changeActive(2)}
        >
          All Logs
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
