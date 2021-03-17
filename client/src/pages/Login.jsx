import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../utils/auth";
import { Container, Button, Form } from "react-bootstrap";

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
    <Container maxwidth="sm" className="login-form">
      <h3>{errorMessage}</h3>

      <h1>Charity Finder</h1>
      <p>Remove the hassle of finding charitable organizations that you’re passionate about with CharityFinder</p>
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control style={{width: "50%", marginLeft: "25%"}} onChange={handleChange} name="email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
          <Form.Control style={{width: "50%", marginLeft: "25%"}} onChange={handleChange} name="password" type="password" />
        </Form.Group>

        <Form.Group>
          <Button variant="primary" type="submit">
            Log In
          </Button>
        </Form.Group>
      </Form>
    </Container>
  );
};
