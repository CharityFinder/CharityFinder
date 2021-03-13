import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../utils/auth";
import axios from "axios";
import { Navbar } from "./Navbar";

export const Home = () => {
  const { userData } = useContext(UserContext);
  const [message, setMessage] = useState(""); /* REST API enpoint */

  const getMessage = async () => {
    const res = await axios.get(`/api/`);
    console.log(res.data);
    setMessage(res.data);
  };

  useEffect(() => {
    (async () => {
      await getMessage();
    })();
  }, []);

  return (
    <div className="home">
      <Navbar />
      <h1>CharityFinder</h1>
      <h2>{message}</h2> {/* Server-side message */}
      {userData && (
        <h3 className="user-info">
          {/* Firebase user auth verfication of current user logged in */}
          Current user signed in: {userData.firstName} {userData.lastName},{" "}
          {userData.email}
        </h3>
      )}
    </div>
  );
};
