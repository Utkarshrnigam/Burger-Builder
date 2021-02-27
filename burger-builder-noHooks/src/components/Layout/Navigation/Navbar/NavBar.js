import React from "react";
import classes from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import Auxi from "../../../../hoc/Auxi";
const NavBar = (props) => {
  let authLink = (
    <NavLink
      className={classes.NavItems}
      activeClassName={classes.active}
      to="/Auth"
    >
      Authentication
    </NavLink>
  );
  if (props.isAuth) {
    authLink = (
      <Auxi>
        <NavLink
          className={classes.NavItems}
          activeClassName={classes.active}
          to="/orders"
        >
          Orders
        </NavLink>
        <NavLink
          className={classes.NavItems}
          activeClassName={classes.active}
          to="/Logout"
        >
          Logout
        </NavLink>
      </Auxi>
    );
  }
  return (
    <nav className={classes.NavBar}>
      <div>Logo</div>

      <ul>
        <NavLink
          className={classes.NavItems}
          activeClassName={classes.active}
          to="/"
          exact
        >
          Burger Builder
        </NavLink>
        {authLink}
      </ul>
    </nav>
  );
};

export default NavBar;
