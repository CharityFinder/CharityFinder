import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { UserContext, getUser, logoutUser } from "./utils/auth";
import { auth } from "./config/firebase";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Home } from "./components/Home";
import "./App.css";
import axios from "axios";

import LogoPage from "./pages/LogoPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const App = () => {
  const [user, setUser] = useState(auth.currentUser); // TODO: Setup Context or Redux Store
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        setLoading(true);
        const userInfo = await getUser(user.uid);
        console.log("User Logged In", userInfo);
        setUserData(userInfo);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleLogout = async () => {
    const { code, message } = (await logoutUser()) || {};
    if (code) {
      console.log(`${code}: ${message}`);
    }
    setUserData(null);
  };

  return (
    <div className="App">
      {loading ? (
        <h2>Loading...</h2>
      ) : (
        <div className="home">
          <BrowserRouter>
            <UserContext.Provider value={{ user, userData }}>
              <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/" component={Home} />
              </Switch>
            </UserContext.Provider>
          </BrowserRouter>
          {user && (
            <button onClick={handleLogout} color="inherit">
              Log Out
            </button>
          )}
        </div>
      )}

    </div>
  );
};

export default App;
