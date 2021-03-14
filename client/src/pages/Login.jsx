import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../utils/auth";
import { Container, Button, TextField, Grid } from "@material-ui/core";
import { Navbar } from "../components/Navbar";

export const Login = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  /* Login User */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, error } = await loginUser(loginData);
    if (error) {
      setErrorMessage(error);
    } else {
      console.log("Logged In User", user);
      history.push("/");
    }
  };

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Container maxWidth="sm" className="login-form">
      <Navbar />
      <h3>{errorMessage}</h3>
      <form onSubmit={handleSubmit} noValidate>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Log In
        </Button>
      </form>
    </Container>
  );
};
