import React from "react";

export const Bubble = ({ className = "", children }) => (
  <div className={`bubble ${className}`}>{children}</div>
);
