import React from "react";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'

// TODO: Handle Navigation B/t components better
export const NavigationBar = () => {
  return (
    <Navbar fixed="top" bg="light" expand="lg">
      <Navbar.Brand href="/">Charity Finder</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
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

      </Navbar.Collapse>
    </Navbar>
  );
};