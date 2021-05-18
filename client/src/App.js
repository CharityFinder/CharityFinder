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
  const [user, setUser] = useState(auth.currentUser); // TODO: Setup Context or Redux Store
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [interests, setInterests] = useState([]);

  useEffect(() => {
    const getInterests = async (id) => {
      const res = await axios.get("/interests", {
        params: {
          userId: id,
        },
      });
      setInterests(res.data);
    };

    auth.onAuthStateChanged(async (user) => {
      setUser(user);
      if (user) {
        setLoading(true);
        const userInfo = await getUser(user.uid);
        console.log("User Logged In", userInfo);
        setUserData(userInfo);
        getInterests(user.uid);
      }
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    console.log("logging off");

    const { code, message } = (await logoutUser()) || {};
    if (code) {
      console.log(`${code}: ${message}`);
    }
    setUserData(null);
    setInterests([]);
  };

  return (
    <>
      {loading ? (
        <h1 className="charity-finder mt-5">Loading...</h1>
      ) : (
        <>
          <BrowserRouter>
            <UserContext.Provider value={{ user, userData, interests }}>
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
                  {user &&
                    (interests.length > 0 ? (
                      <Route path="/" component={Search} />
                    ) : (
                      <Route path="/" component={Survey} />
                    ))}
                  <Route component={Home} />
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
