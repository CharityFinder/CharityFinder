import React from "react";
import { useHistory } from "react-router-dom";

// TODO: Handle Navigation B/t components better
export const Navbar = () => {
  const history = useHistory();

  const handleLogin = () => {
    history.push("/login");
  };

  const handleRegister = () => {
    history.push("/register");
  };

  const handleHome = () => {
    history.push("/");
  };

  return (
    <nav>
      <button onClick={handleHome}> Home </button>
      <button onClick={handleLogin}> Login </button>
      <button onClick={handleRegister}> Register </button>
    </nav>
  );
};
