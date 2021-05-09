import React, { useState, useContext, useEffect, useRef } from "react";
import { UserContext } from "../utils/auth";
import axios from "axios";
import "../styles/Home.css";
import { useHistory } from "react-router-dom";
import { Login } from "./Login";

export const Home = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [interestsSize, setInterestsSize] = useState(-1);
  const [count, setCount] = useState("0000");
  const countInterval = useRef();

  useEffect(() => {
    const getInterests = async () => {
      const res = await axios.get("/api/interests", {
        params: {
          userId: user.uid,
        },
      });
      setInterestsSize(res.data.length);
    };

    if (user && interestsSize === -1) {
      // user logged on and never before been set
      getInterests();
    }
  }, [user, interestsSize]);

  useEffect(() => {
    if (interestsSize === 0) {
      history.push("/survey");
    } else if (interestsSize >= 1) {
      // they have already had an interest, go to search
      history.push("/search");
    }
  }, [interestsSize, history]);

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
  }, []);

  return (
    <div className="bubble">
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
    </div>
  );
};
