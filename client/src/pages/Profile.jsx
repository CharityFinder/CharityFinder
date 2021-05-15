import React, { useState, useEffect, useContext } from "react";
import { Container, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../utils/auth";
import { CAUSES } from "../utils/constants";

export const Profile = () => {
  const { user, userData, interests } = useContext(UserContext);
  const [userInterests, setUserInterests] = useState([]);

  //pulls the information from usercontext into a state to display with 
  useEffect(() => {
    if (userInterests.length === 0) {
      setUserInterests(interests);
    }
  }, [interests]);

  //deletes interests and refreshes view
  const handleDelete = async (causeId, interestsId) => {
    await axios.delete("/api/interests/" + interestsId, {
      params: {
        causeId: causeId,
        interestId: interestsId,
      },
    });

    //used to simulate updating the page
    setUserInterests((oldUserInterests) => {
      return oldUserInterests.filter((interest) => {
        return interest.id !== interestsId;
      })
    })
  };

  const generateInterests = () => {
    return userInterests.map((interest) => {
      return (
        <tr key={interest.causeId}>
          <td>{CAUSES.filter(cause => parseInt(cause.causeId) === parseInt(interest.causeId))[0].causeName}</td>
          <td
            style={{
              border: "1px solid white",
              backgroundColor: "white",
              width: "2rem",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-x-circle"
              viewBox="0 0 16 16"
              onClick={() => {
                handleDelete(interest.causeId, interest.id)
              }}
              style={{ cursor: "pointer" }}
            >
              <path
                d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"
              />
              <path
                d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
              />
            </svg>
          </td>
        </tr>
      )
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
      {!userInterests.length ? 
        <p> No Current Interests </p>
        : 
        <Table
          striped
          bordered
          hover
          style={{ width: "31.8vw", minWidth: "250px", margin: "auto" }}
        >
          <tbody>{generateInterests()}</tbody>
        </Table>
      }

      <Link to={`/survey/`}>Add Interests</Link>
    </Container>
  );
};
