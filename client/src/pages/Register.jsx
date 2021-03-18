import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../utils/auth";
import { Container, Button, Form } from "react-bootstrap";

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

  /* Register User */
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

  // TODO: Add missing fields to form
  return (
    <Container maxwidth="sm" className="mt-5 jumbotron vertical-center">
      <h3>{errorMessage}</h3>
      <h1 className="mt-0">Charity Finder</h1>
      <p>Remove the hassle of finding charitable organizations that you’re passionate about with CharityFinder</p>
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control style={{width: "50%", marginLeft: "25%"}} onChange={handleChange} name="firstName" />
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control style={{width: "50%", marginLeft: "25%"}} onChange={handleChange} name="lastName" />
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control style={{width: "50%", marginLeft: "25%"}} onChange={handleChange} name="email" />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
          <Form.Control style={{width: "50%", marginLeft: "25%"}} onChange={handleChange} name="password" type="password"  />
        </Form.Group>

        <Form.Group>
          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form.Group>
      </Form>

    </Container>
  );
};
