import React from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './auth/LogoutButton';


const NavBar = ({ setAuthenticated }) => {
  return (
    <nav className="flex m-auto flex-nowrap bg-gray-400 justify-around mb-12">

      <a className="w-1/4" href="/home" exact={true} activeClassName="active">
        <div className="">
            <div className="pt-4 pb-4 hover:bg-green-700 text-center">
              Home
            </div>
        </div>
          </a>

      <a className="w-1/4" href="/rosters" exact={true} activeClassName="active">
        <div className="">
          <div className="pt-4 pb-4 hover:bg-blue-700 text-center">
              Rosters
          </div>
        </div>
      </a>


      <a className="w-1/4" href="/members" exact={true} activeClassName="active">
        <div className="">
          <div className="pt-4 pb-4 hover:bg-yellow-400 text-center">
            Database
          </div>
        </div>
      </a>

      {/* <a href="logout" className="w-1/4"> */}
        
          <LogoutButton setAuthenticated={setAuthenticated} />
       
      {/* </a> */}
    </nav>
  );
}

export default NavBar;