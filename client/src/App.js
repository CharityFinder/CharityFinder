import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LogoPage from "./pages/LogoPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";

const App = () => {
  const [message, setMessage] = useState("");

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
    <div className="App">
      <Router>
        <Switch>
          {/* <Route path="/" exact component={LogoPage}/> */}
          <Route path="/" exact render={() => <LogoPage logo={logo} message={message}/>}/>
          <Route path="/login" exact component={LoginPage}/>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
