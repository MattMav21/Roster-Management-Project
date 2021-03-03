import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';

const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="relative flex flex-wrap items-center justify-between px-2 py-3 navbar-expand-lg bg-accentLight mb-3">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between list-none">
        <li list-none>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/login" exact={true} activeClassName="active">
            Login
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-up" exact={true} activeClassName="active">
            Sign Up
          </NavLink>
        </li>
        <li>
          <NavLink to="/users" exact={true} activeClassName="active">
            Users
          </NavLink>
        </li>
        <li>
          <LogoutButton setAuthenticated={setAuthenticated} />
        </li>
      </div>
    </nav>
  );
}

export default NavBar;