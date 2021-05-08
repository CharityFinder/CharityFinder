import React from "react";
import Logo from "../images/charitynavigatorlogo.png";
import "../styles/Footer.css";

export const Footer = () => {
  // TODO: make text-size scale with screen size
  return (
    <footer className="footer">
      <img src={Logo} alt="charitynavigator" />
      <div className="cnlogo">
        Powered by:{" "}
        <a href="https://www.CharityNavigator.org" target=" ">
          Charity Navigator
        </a>
      </div>
      <div className="contact">
        Contact Us:{" "}
        <a href="mailto:contact@charityfinder.us">contact@charityfinder.us</a>
      </div>
    </footer>
  );
};
