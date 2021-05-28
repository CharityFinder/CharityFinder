import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext, getUser, logoutUser } from "./utils/auth";
import { auth } from "./config/firebase";
import axios from "axios";

import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Survey } from "./pages/Survey";
import { Search } from "./pages/Search";
import { Favorites } from "./pages/Favorites";
import { Information } from "./pages/Information";
import { Profile } from "./pages/Profile";
import { Donations } from "./pages/Donations";
import { Popular } from "./pages/Popular";
import "./styles/App.css";

const App = () => {
  const [user, setUser] = useState(auth.currentUser);
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        setLoading(true);
        const userInfo = await getUser(user.uid);
        setUserData(userInfo);
      }
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    const { code, message } = (await logoutUser()) || {};
    if (code) {
      console.log(`${code}: ${message}`);
    }
    setUserData({});
  };

  return (
    <>
      {loading ? (
        <h1 className="charity-finder mt-5">Loading...</h1>
      ) : (
        <>
          <BrowserRouter>
            <UserContext.Provider value={{ user, userData }}>
              <div className="App">
                <Navbar logoutHandler={handleLogout} />
                <Switch>
                  <Route path="/about" component={About} />
                  <Route path="/register" component={Register} />
                  <Route path="/search" component={Search} />
                  <Route path="/survey" component={Survey} />
                  <Route path="/favorites" component={Favorites} />
                  <Route path="/donations" component={Donations} />
                  <Route path="/information" component={Information} />
                  <Route path="/profile" component={Profile} />
                  <Route path="/popular" component={Popular} />
                  <Route path="/" component={Home} />
                </Switch>
              </div>
              <Footer />
            </UserContext.Provider>
          </BrowserRouter>
        </>
      )}
    </>
  );
};

export default App;
