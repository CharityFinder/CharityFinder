import React from "react";
import { FiveStars } from "./FiveStars";
import "../styles/Ratings.css";
/**
 * A List of Ratings
 * @param {*} ratings
 */
export const Ratings = ({ ratings }) => {
  return (
    <div className="ratings">
      {ratings.map((e, index) => (
        <Rating {...e} key={index} />
      ))}
    </div>
  );
};

const Rating = ({ title, rating }) => (
  <>
    <p>{title}</p>
    <FiveStars rating={rating} color={"var(--primary-light)"} />
  </>
);
