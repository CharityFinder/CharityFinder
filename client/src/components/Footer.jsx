import React from "react";
import "../styles/Footer.css";
import { CONTACT } from "../utils/constants";
import { PoweredByCN } from "./PoweredByCN";

export const Footer = () => (
  <footer>
    <PoweredByCN />
    <p className="contact">
      {CONTACT.contact_us}
      <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
    </p>
  </footer>
);
