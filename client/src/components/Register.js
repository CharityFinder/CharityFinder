import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../utils/auth";
import { Container, Button, TextField, Grid } from "@material-ui/core";
import { Navbar } from "./Navbar";

export const Register = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, error } = await registerUser(loginData);
    if (error) {
      setErrorMessage(error);
    } else {
      history.push("/");
    }

    console.log("Registered User", user);
  };

  return (
    <Container maxWidth="sm" className="register-form">
      <Navbar />
      <h3>{errorMessage}</h3>
      <form onSubmit={handleSubmit} noValidate>
        <Grid container spacing={2} alignItems="center" justify="center">
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="firstName"
              label="firstName"
              id="firstName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              name="lastName"
              label="lastName"
              id="lastName"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              variant="outlined"
              required
              fullWidth
              id="email"
              label="Email"
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
        </Grid>
        <Button type="submit" fullWidth variant="contained" color="primary">
          Register
        </Button>
      </form>
    </Container>
  );
};