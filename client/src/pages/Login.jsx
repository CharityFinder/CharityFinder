import React, { useState } from "react";
import { loginUser } from "../utils/auth";
import { Form } from "react-bootstrap";
import { Button } from "../components/Button";
import "../styles/Login.css";
import { APP_NAME } from "../utils/constants";

export const Login = () => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[e.target.name])
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
  };

  const findFormErrors = () => {
    const { email, password } = loginData;
    const newErrors = {};
    // email errors
    if (!email) newErrors.email = "cannot be blank!";
    // password errors
    if (!password) newErrors.password = "cannot be blank!";

    return newErrors;
  };

  /* Login User */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      const { user, error } = await loginUser(loginData);
      if (error) {
        setErrorMessage(error["message"]);
      } else {
        console.log("Logged In User", user);
      }
    }
  };

  return (
    <div className="login-container">
      <h5>
        Welcome to <span className="charity-finder">{APP_NAME}</span>
        {/* Welcome to {APP_NAME} */}
      </h5>
      <Form onSubmit={handleSubmit} noValidate className="login-form">
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="email"
            isInvalid={!!errors.email}
          />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            name="password"
            type="password"
            isInvalid={!!errors.password}
          />
        </Form.Group>

        <Form.Group className="submit">
          <Button text="Log In" />
        </Form.Group>

        <a href="/register" className="register-link">
          New? Register here
        </a>
      </Form>
      {errorMessage && <h6>{errorMessage}</h6>}
    </div>
  );
};
