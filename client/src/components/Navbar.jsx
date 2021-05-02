import {Navbar as BootstrapNavbar, Nav, Image} from 'react-bootstrap'
import React, { useContext } from "react";
import { UserContext } from "../utils/auth";
import cfLogo from "../images/logo.png";

// TODO: Handle Navigation B/t components better
// TODO: add color changing on phone dropdowns
// TODO: brighten up the color for navbar links

export const Navbar = ({logoutHandler}) => {
  const { user } = useContext(UserContext);

  return (
    <BootstrapNavbar fixed="top" expand="lg" className="navbar navbar-dark" style={{margin:0}}>
      <BootstrapNavbar.Brand href="/">
      <Nav style={{marginRight: 30}}>
          <Image src={cfLogo} width={50} height={50} style={{position: "absolute", top:2, left:5, paddingBottom: "1px"}}/>
      </Nav>
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className = "inactive" href="/">Home</Nav.Link>
          <Nav.Link className = "inactive" href="/about">About</Nav.Link>
        </Nav>

        <Nav className="ml-auto">
          {!user ?
            <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            </>
            :
            <>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <Nav.Link href="/profile">Profile</Nav.Link>
            <Nav.Link href="/">Donations</Nav.Link>
            <Nav.Link href="/" onClick={logoutHandler}>Logout</Nav.Link>
            </>
          }
        </Nav>

      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};