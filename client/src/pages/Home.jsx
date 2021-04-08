import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../utils/auth";
import axios from "axios";
import "../styles/Home.css";
import { useHistory } from "react-router-dom";

export const Home = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [interestsSize, setInterestsSize] = useState(-1);

  useEffect(() => {
    const getInterests = async () => {
      const res = await axios.get('/api/interests', {
        params: {
          userId: user.uid
        }
      })
      setInterestsSize(res.data.length);
    }

    if (user && interestsSize === -1) { // user logged on and never before been set
      getInterests();
    }
  }, [user]);

  useEffect(() => {
    if (interestsSize === 0) {
      history.push("/survey");
    }
    else if (interestsSize >= 1) { // they have already had an interest, go to search
      history.push("/search");
    }
  }, [interestsSize, history]);

  return (
    <div className="home description">
      <h1 className="mt-0">CharityFinder</h1>
      <p>Remove the hassle of finding charitable organizations that you’re passionate about with CharityFinder</p>
      <p>Search through 1000s of charitable organizations</p>
      <p>Get recommendations for charities that match your passions</p>
      <p>Keep track of your favorite organizations</p>
    </div>
  );
};
