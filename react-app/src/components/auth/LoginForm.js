import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { login } from "../../services/auth";

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
    <form className="border-black m-auto flex flex-col w-6/12" onSubmit={onLogin}>
      <div>
        {errors.map((error) => (
          <div>{error}</div>
        ))}
        <h1 className="bg-gray-200 border-black p-4 text-center w-full"> Login </h1>
      </div>
      <div className="flex flex-col p-2">
        <label className="text-left p-1 text-left" htmlFor="email">Email</label>
        <input
          className="bg-gray-100"
          name="email"
          type="text"
          placeholder="Email"
          value={email}
          onChange={updateEmail}
        />
      </div>
      <div className="flex flex-col p-2">
        <label className="text-left p-1 text-left" htmlFor="password">Password</label>
        <input
          className="bg-gray-100"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={updatePassword}
        />
        <button className="bg-green-700 w-6/12 self-center p-1 m-4 hover:bg-blue-300 hover:text-yellow-300 rounded" type="submit">Login</button>
      </div>
      <div className="p-3">
        <a classNane="text-blue-500" href="/sign-up">I don't have an account</a>
      </div>
    </form>
    </div>
  );
};

export default LoginForm;
