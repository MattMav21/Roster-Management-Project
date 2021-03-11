import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const user = await signUp(username, email, password);
      if (!user.errors) {
        setAuthenticated(true);
      }
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="p-14">
    <form className="border-black m-auto flex flex-col w-6/12" onSubmit={onSignUp}>
      <h1 className="bg-gray-200 border-black p-4 text-center w-full"> Sign Up </h1>
      <div className="flex flex-col p-2">
        <label className="text-left p-1 text-left">User Name</label>
        <input
          className="bg-gray-100"
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="flex flex-col p-2">
        <label className="text-left p-1 text-left">Email</label>
        <input
          className="bg-gray-100"
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="flex flex-col p-2">
        <label className="text-left p-1 text-left">Password</label>
        <input
          className="bg-gray-100"
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="flex flex-col p-2">
        <label className="text-left p-1 text-left">Repeat Password</label>
        <input
          className="bg-gray-100"
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
      </div>
      <button className="bg-green-700 w-6/12 self-center p-1 m-4 hover:bg-blue-300 hover:text-yellow-300 rounded" type="submit">Sign Up</button>
      <div className="p-3">
        <a classNane="text-blue-500" href="/login">I already have an account</a>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;
