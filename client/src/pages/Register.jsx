import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../utils/auth";
import { Container, Form } from "react-bootstrap";
import { Button } from "../components/Button";
import "../styles/Form.css";

export const Register = () => {
  const history = useHistory();
  const [loginData, setLoginData] = useState({firstName: "", lastName: "", email: "", password: ""});
  const [errors, setErrors] = useState({})
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if ( !!errors[e.target.name] ) setErrors({
      ...errors,
      [e.target.name]: null
    })
  };

  const findFormErrors = () => {
    const { firstName, lastName, email, password } = loginData
    const newErrors = {}
    // firstName errors
    if ( firstName === '' ) newErrors.firstName = 'cannot be blank!'
    // lastName errors
    if ( lastName === '' ) newErrors.lastName = 'cannot be blank!'
    // email errors
    if ( email === '' ) newErrors.email = 'cannot be blank!'
    // password errors
    if ( password === '' ) newErrors.password = 'cannot be blank!'

    return newErrors
  }

  /* Register User */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors()
    if ( Object.keys(newErrors).length > 0 ) {
      // We got errors!
      setErrors(newErrors)
    } else {
      // No errors! Put any logic here for the form submission!
      const { user, error } = await registerUser(loginData);
      if (error) {
        setErrorMessage(error["message"]);
      } 
      else if (user !== undefined) {
        history.push("/");
        console.log("Registered User", user);
      }
    }
  };

  // TODO: Add missing fields to form
  return (
    <Container className="mt-5 jumbotron vertical-center shadow-container shadow-lg">
      
      <h1 className="mt-0">Charity Finder</h1>
      <p>Remove the hassle of finding charitable organizations that you’re passionate about with CharityFinder</p>
      <h4 >{errorMessage}</h4>
      <Form onSubmit={handleSubmit} noValidate>
        <Form.Group controlId="formBasicFirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control style={{width: "50%", marginLeft: "25%"}} onChange={handleChange} name="firstName" isInvalid={ !!errors.firstName }/>
        </Form.Group>

        <Form.Group controlId="formBasicLastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control style={{width: "50%", marginLeft: "25%"}} onChange={handleChange} name="lastName" isInvalid={ !!errors.lastName }/>
        </Form.Group>

        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control style={{width: "50%", marginLeft: "25%"}} onChange={handleChange} name="email" isInvalid={ !!errors.email }/>
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
          <Form.Control style={{width: "50%", marginLeft: "25%"}} onChange={handleChange} name="password" type="password" isInvalid={ !!errors.password }/>
        </Form.Group>

        <Form.Group>
          <Button text="Register"/>
        </Form.Group>
      </Form>

    </Container>
  );
};
