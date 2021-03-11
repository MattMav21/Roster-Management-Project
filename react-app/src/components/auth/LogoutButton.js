import React from "react";
import { logout } from "../../services/auth";

const LogoutButton = ({setAuthenticated}) => {
  const onLogout = async (e) => {
    await logout();
    setAuthenticated(false);
  };

  return <button className="pt-4 pb-4 hover:bg-red-700 w-1/4 text-center" onClick={onLogout}>Logout</button>;
};

export default LogoutButton;
