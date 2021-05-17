import React from "react";
import "../styles/BigCard.css";

export const TagContainer = ({ title, info }) => (
  <div className="tag-container">
    <p className="title">{title}</p>
    <p className="info">{info}</p>
  </div>
);
