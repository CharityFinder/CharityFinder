import React, { useState, useEffect, useRef, useContext } from "react";
import { Bubble } from "../components/Bubble";
import { UserContext } from "../utils/auth";
import { Login } from "./Login";
import "../styles/Home.css";

export const Home = () => {
  const { user } = useContext(UserContext);
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

      {!user && <Login />}
    </Bubble>
  );
};
