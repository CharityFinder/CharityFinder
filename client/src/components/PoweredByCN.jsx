import React from "react";
import Logo from "../images/charitynavigatorlogo.png";
import "../styles/PoweredByCN.css";

export const PoweredByCN = () => (
  <a
    href="http://www.CharityNavigator.org"
    target="_blank"
    rel="noopener noreferrer"
    className="powered-by-cn"
  >
    <img src={Logo} alt="charitynavigator" className="logo" />
    <span>Powered by Charity Navigator</span>
  </a>
);
