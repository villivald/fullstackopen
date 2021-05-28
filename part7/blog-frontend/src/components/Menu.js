import React from "react";
import { NavLink } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menuContainer">
      <p className="menuLink">
        <NavLink activeClassName="active" exact={true} to="/">
          Blogs
        </NavLink>
      </p>
      <p className="menuLink">
        <NavLink activeClassName="active" to="/users">
          Users
        </NavLink>
      </p>
    </div>
  );
};

export default Menu;
