import React, { useState, useEffect, useRef } from "react";
import { Bubble } from "../components/Bubble";
import "../styles/Home.css";
import { Login } from "./Login";

export const Home = () => {
  const [count, setCount] = useState("0000");
  const countInterval = useRef();

  useEffect(() => {
    /* Set an interval to count up to 1000 */
    const countUp = () => {
      countInterval.current = setInterval(() => {
        if (count >= 1000) {
          clearIt();
        }
        setCount((prev) => {
          prev = parseInt(prev);

          if (prev >= 999) {
            clearIt();
          }

          return `${++prev}`.padStart(4, "0");
        });
        console.log("Home setInterval");
      }, 1);
    };

    const clearIt = () => {
      clearInterval(countInterval.current);
    };
    countUp();

    return clearIt;
  }, []);

  return (
    <Bubble className="d-flex align-items-center">
      <div className="home-about">
        <p>
          Remove the hassle of finding charitable organizations that you’re
          passionate about with CharityFinder.
        </p>
        <p>
          Search through <span className="charity-finder">{count}s</span> of
          charitable organizations
        </p>
        <p>Get recommendations for charities that match your passions</p>
        <p>Keep track of your favorite organizations</p>
      </div>

      <Login />
    </Bubble>
  );
};
