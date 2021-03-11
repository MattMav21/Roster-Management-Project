import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';


const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="flex m-auto flex-nowrap bg-black justify-around">

        <div className="w-1/4">
          <a className="" to="/" exact={true} activeClassName="active">
            <div className="pt-4 pb-4 bg-green-900">
              Home
            </div>
          </a>
        </div>

      <div className="w-1/4">
          <a to="/rosters" exact={true} activeClassName="active">
          <div className="pt-4 pb-4  bg-blue-900">
              Rosters
            </div>
          </a>
        </div>


      <div className="w-1/4">
            <a to="/members" exact={true} activeClassName="active">
          <div className="pt-4 pb-4 bg-yellow-400">
                Database
              </div>
            </a>
          </div>

      <div className="pt-4 pb-4  bg-red-900 w-1/4">
            <LogoutButton setAuthenticated={setAuthenticated} />
          </div>
    </nav>
  );
}

export default NavBar;