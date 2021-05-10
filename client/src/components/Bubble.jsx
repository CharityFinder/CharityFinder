import React from "react";
import "../styles/Bubble.css";

export const Bubble = ({ className = "", children }) => (
  <div className={`bubble ${className}`}>{children}</div>
);
