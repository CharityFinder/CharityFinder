import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { loginUser } from "../utils/auth";
import { Container, Form } from "react-bootstrap";
import { Button } from "../components/Button";
import "../styles/Form.css";

export const Login = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  /* Login User */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { user, error } = await loginUser(loginData);
    if (error) {
      setErrorMessage(error["message"]);
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
    <Container className="jumbotron vertical-center shadow-container shadow-lg">
      <h1 className="mt-0">Charity Finder</h1>
      <p>Remove the hassle of finding charitable organizations that you’re passionate about with CharityFinder</p>  
      <h4>{errorMessage}</h4>
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
          <Button text="Log In"/>
        </Form.Group>
      </Form>
    </Container>
  );
};