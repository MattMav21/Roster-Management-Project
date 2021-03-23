import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";
import "./auth.css";

const LoginForm = ({ authenticated, setAuthenticated }) => {
  const [errors, setErrors] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onLogin = async (e) => {
    e.preventDefault();
    const user = await login(email, password);
    if (!user.errors) {
      setAuthenticated(true);
    } else {
      setErrors(user.errors);
    }
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (authenticated) {
    return <Redirect to="/home" />;
  }

  return (
    <div className="p-14">
    <style>{'body { background-color: navy; }'}</style>
    <form className="rounded border-black m-auto flex flex-col bg-gray-700 w-9/12 h-4/5 text-lg" onSubmit={onLogin}>
      <div className="relative left-2">
        {errors.length ? <div className="text-red-600 font-bold">Errors:</div> : <></>}
        {errors.map((error) => (
          <>
            <li className="text-red-800">{error}</li>
          </>
        ))}
      </div>
      <h1 className="bg-gray-200 border-black p-4 text-center w-full bg-gray-300 text-bold"> Login </h1>
      <div className="flex flex-col p-2">
          <label className="text-left p-1 text-left font-bold text-white" htmlFor="email">Email:</label>
        <input
          //focus:bg-yellow-400
          className="shadow-inner rounded bg-gray-200 border border-gray-400 focus:bg-blue-200"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="flex flex-col p-2">
          <label className="text-left p-1 text-left font-bold text-white" htmlFor="password">Password:</label>
        <input
            className="shadow-inner rounded bg-gray-200 border border-gray-400 focus:bg-blue-200"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
          <button className="text-gray-700 p-2 bg-blue-400 bg-green-700 w-6/12 self-center p-1 mt-12 rounded" type="submit">Login</button>
      </div>
      <div className="p-3">
          <a className="text-blue-500 hover:underline" href="/sign-up">I don't have an account</a>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
