import React, { useState, useEffect, useContext } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../utils/auth";
import { CAUSES } from "../utils/constants";

export const Profile = () => {

  const { user, userData, interests } = useContext(UserContext);
  
  const generateInterests = () => {
    return interests.map((interest) => {
      return <p key={interest.causeId}>{CAUSES.filter(cause => parseInt(cause.causeId) === parseInt(interest.causeId))[0].causeName}</p>
    })
  }

  return (
    <Container>
      <p>Name: {userData.firstName} {userData.lastName} </p>
      <p>Email: {userData.email} </p>
      <p>City: {userData.city} </p>
      <p>State: {userData.state} </p>
      <p>Zipcode: {userData.zipcode}</p>
      <br/>
      <h3>Current Interests:</h3>
      {generateInterests()}
      <Link to={`/survey/`}>Retake Survey</Link>
    </Container>
  );
};
