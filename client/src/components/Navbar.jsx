import React from "react";
// import { useHistory } from "react-router-dom";
import NavbarLink from "./NavbarLink";

// TODO: Handle Navigation B/t components better
export const Navbar = () => {
  // const history = useHistory();

  // const handleHome = () => {
  //   history.push("/");
  // };

  // const handleLogin = () => {
  //   history.push("/login");
  // };

  // const handleRegister = () => {
  //   history.push("/register");
  // };

  return (
    <nav>
      <NavbarLink link="/" display="Home" />
      <NavbarLink link="/login" display="Login" />
      <NavbarLink link="/register" display="Register" />
      {/* <button onClick={handleHome}> Home </button>
      <button onClick={handleLogin}> Login </button>
      <button onClick={handleRegister}> Register </button> */}
    </nav>
  );
};
