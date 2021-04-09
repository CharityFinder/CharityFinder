import {Navbar as BootstrapNavbar, Nav} from 'react-bootstrap'
import React, { useContext } from "react";
import { UserContext } from "../utils/auth";

// TODO: Handle Navigation B/t components better
// TODO: add color changing on phone dropdowns
// TODO: brighten up the color for navbar links

export const Navbar = ({logoutHandler}) => {
  const { userData } = useContext(UserContext);

  return (
    <BootstrapNavbar fixed="top" expand="lg" className="navbar navbar-dark" style={{margin:0}}>
      <BootstrapNavbar.Brand href="/">Charity Finder</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link className = "inactive" href="/">Home</Nav.Link>
        </Nav>

        <Nav className="ml-auto">
          {!userData ?
            <>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            </>
            :
            <>
            <Nav.Link href="/favorites">Favorites</Nav.Link>
            <Nav.Link href="/">Profile</Nav.Link>
            <Nav.Link href="/">Donations</Nav.Link>
            <Nav.Link href="/" onClick={logoutHandler}>Logout</Nav.Link>
            </>
          }
        </Nav>

      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};