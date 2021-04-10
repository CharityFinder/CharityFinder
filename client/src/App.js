import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { UserContext, getUser, logoutUser } from "./utils/auth";
import { auth } from "./config/firebase";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Survey } from "./pages/Survey";
import { Search } from "./pages/Search";
import { Favorites } from "./pages/Favorites";
import { Information } from "./pages/Information";
import "./styles/App.css";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";


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
    console.log("logging off");

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
              <Navbar logoutHandler={handleLogout} />
              
              <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/search" component={Search} />
                <Route path="/survey" component={Survey} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/information" component={Information} />
                <Route path="/" component={Home} />
              </Switch>
              <Footer />
            </UserContext.Provider>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
};

export default App;
