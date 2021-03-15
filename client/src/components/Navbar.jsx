import React from "react";
import {Navbar as BootstrapNavbar, Nav} from 'react-bootstrap/'

// TODO: Handle Navigation B/t components better
export const Navbar = () => {
  return (
    <BootstrapNavbar fixed="top" bg="light" expand="lg">
      <BootstrapNavbar.Brand href="/">Charity Finder</BootstrapNavbar.Brand>
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="/">Home</Nav.Link>
        </Nav>

        <Nav className="ml-auto">
          {/* TODO: add a switch that only shows one */}
          <Nav.Link href="/login">Login</Nav.Link>
          <Nav.Link href="/register">Register</Nav.Link>

          <Nav.Link href="/">Favorites</Nav.Link>
          <Nav.Link href="/">Profile</Nav.Link>
          <Nav.Link href="/">Donations</Nav.Link>
        </Nav>

      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};