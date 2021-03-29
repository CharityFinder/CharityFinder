import { Navbar as BootstrapNavbar, Nav, Image } from "react-bootstrap";
import React from "react";
import Logo from "../images/charitynavigatorlogo.png"

export const Footer = () => {
  // TODO: make text-size scale with screen size
  return (
    <BootstrapNavbar fixed="bottom"  className="navbar navbar-dark ">
      <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
      <BootstrapNavbar.Collapse id="basic-navbar-nav">
      <Nav className="mr-0">
          <Image src={Logo} width={82} height={71} />
      </Nav>
      <Nav className="mr-auto">
          <Nav.Item>Powered by: <a style={{color: "white"}} href="https://www.CharityNavigator.org" target=" ">Charity Navigator</a></Nav.Item>
      </Nav>
      <Nav className="ml-auto">
        <Nav.Item>Contact Us: charityfinder.company@gmail.com</Nav.Item>          
      </Nav>

      </BootstrapNavbar.Collapse>
    </BootstrapNavbar>
  );
};
