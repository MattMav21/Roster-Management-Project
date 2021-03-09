import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';


const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="relative flex flex-wrap items-center justify-between navbar-expand-lg bg-accentLight mb-3 bg-gray-200">
      <div className="container px-4 mx-auto flex flex-wrap items-center justify-between list-none">
        <div list-none="true" className="px-2 py-3">
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </div>
        <div list-none="true" className="px-2 py-3">
          <NavLink to="/rosters" exact={true} activeClassName="active">
            Rosters
          </NavLink>
        </div>
        <div list-none="true" className="px-2 py-3">
          <NavLink to="/members" exact={true} activeClassName="active">
            Database
          </NavLink>
        </div>
        <div className="px-2 py-3">
          <LogoutButton setAuthenticated={setAuthenticated} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;