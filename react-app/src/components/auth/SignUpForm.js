import React, { useState } from "react";
import { Redirect } from 'react-router-dom';
import { signUp } from '../../services/auth';
import "./auth.css";

const SignUpForm = ({authenticated, setAuthenticated}) => {
  const [errors, setErrors] = useState([]);
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
      } else {
        setErrors(user.errors)
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
      <form className="rounded border-black m-auto flex flex-col bg-gray-700 h-4/5 text-lg" onSubmit={onSignUp}>
      <style>{'body { background-color: navy; }'}</style>
      <h1 className="bg-gray-200 border-black p-4 text-center w-full bg-gray-300 text-bold"> Sign Up </h1>
        {errors.length ? <div className="text-red-600 font-bold">Errors:</div> : <></>}
        {errors.map((error) => (
          <>
            <li className="text-red-800 bg-bold">{error}</li>
          </>
        ))}
      <div className="flex flex-col p-2">
          <label className="text-left p-1 text-left font-bold text-white">User Name</label>
        <input
            className="shadow-inner rounded bg-gray-200 border border-gray-400 focus:bg-blue-200"
          type="text"
          name="username"
          onChange={updateUsername}
          value={username}
        ></input>
      </div>
      <div className="flex flex-col p-2">
          <label className="text-left p-1 text-left font-bold text-white">Email</label>
        <input
            className="shadow-inner rounded bg-gray-200 border border-gray-400 focus:bg-blue-200"
          type="text"
          name="email"
          onChange={updateEmail}
          value={email}
        ></input>
      </div>
      <div className="flex flex-col p-2">
          <label className="text-left p-1 text-left font-bold text-white">Password</label>
        <input
            className="shadow-inner rounded bg-gray-200 border border-gray-400 focus:bg-blue-200"
          type="password"
          name="password"
          onChange={updatePassword}
          value={password}
        ></input>
      </div>
      <div className="flex flex-col p-2">
          <label className="text-left p-1 text-left font-bold text-white">Repeat Password</label>
        <input
            className="shadow-inner rounded bg-gray-200 border border-gray-400 focus:bg-blue-200"
          type="password"
          name="repeat_password"
          onChange={updateRepeatPassword}
          value={repeatPassword}
          required={true}
        ></input>
        <button className="text-gray-700 p-2 bg-blue-400 bg-green-700 w-6/12 self-center p-1 mt-12 rounded" type="submit">Sign Up</button>
      </div>
      <div className="p-3">
          <a className="text-blue-500 hover:underline" href="/login">I already have an account</a>
      </div>
    </form>
    </div>
  );
};

export default SignUpForm;
