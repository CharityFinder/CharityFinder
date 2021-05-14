import { Navbar as BootstrapNavbar, Nav } from "react-bootstrap";
import React, { useContext } from "react";
import { UserContext } from "../utils/auth";
import { APP_NAME } from "../utils/constants";

export const Navbar = ({ logoutHandler }) => {
  const { user } = useContext(UserContext);

  return (
    <BootstrapNavbar sticky="top" expand="lg" className="navbar-cf p-0">
      <BootstrapNavbar.Brand className="p-0" href="/">
        <Nav>
          <h1 className="charity-finder ml-3 my-0">{APP_NAME}</h1>
        </Nav>
      </BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto mr-3">
          {!user ? (
            <>
              <Nav.Link href="/register">Register</Nav.Link>
            </>
          ) : (
            <>
              <Nav.Link href="/popular">Popular</Nav.Link>
              <Nav.Link href="/favorites">Favorites</Nav.Link>
              <Nav.Link href="/profile">Profile</Nav.Link>
              <Nav.Link href="/donations">Donations</Nav.Link>
              <Nav.Link href="/" onClick={logoutHandler}>
                Logout
              </Nav.Link>
            </>
          )}
          <Nav.Link href="/about">About</Nav.Link>
        </Nav>
      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};
