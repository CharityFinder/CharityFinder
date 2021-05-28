import React, { useState, useEffect, useContext } from "react";
import { Container, Table, Button, Form } from "react-bootstrap";
import { STATE_ABBREVIATIONS } from "../utils/constants";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../utils/auth";
import { CAUSES } from "../utils/constants";

export const Profile = () => {
  const { user, userData } = useContext(UserContext);
  const [userInterests, setUserInterests] = useState([]);
  const [editing, setEditing] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginData, setLoginData] = useState({ firstName: "" });

  //pulls the information from userinfo into a state to display with
  useEffect(() => {
    if (loginData.firstName === "") {
      setLoginData(userData);
    }
  }, [loginData]);

  //pulls the information from usercontext into a state to display with
  useEffect(() => {
    const getInterests = async () => {
      try {
        const res = await axios.get("/api/interests", {
          params: {
            userId: user.uid,
          },
        });
        setUserInterests(res.data || []);
      } catch {
        setUserInterests([]);
      }
    };

    getInterests();
  }, []);

  //pulls information into states
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
      });
    });
  };

  const generateInterests = () => {
    return (
      userInterests &&
      userInterests.map((interest) => {
        return (
          <tr key={interest.causeId}>
            <td>
              {
                CAUSES.filter(
                  (cause) =>
                    parseInt(cause.causeId) === parseInt(interest.causeId)
                )[0].causeName
              }
            </td>
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
                  handleDelete(interest.causeId, interest.id);
                }}
                style={{ cursor: "pointer" }}
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
            </td>
          </tr>
        );
      })
    );
  };

  //toggles between editing display and nonediting display
  const toggleEditing = () => {
    setEditing((previousEditingValue) => !previousEditingValue);
  };

  const findFormErrors = () => {
    const { firstName, lastName } = loginData;
    const newErrors = {};
    // firstName errors
    if (!firstName) newErrors.firstName = "cannot be blank!";
    // lastName errors
    if (!lastName) newErrors.lastName = "cannot be blank!";

    return newErrors;
  };

  //handles submissions for changing userdata
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      // call axios to update user
      await axios.put("/api/users/" + user.uid, null, {
        params: {
          userBody: JSON.stringify(loginData),
        },
      });
      toggleEditing();
    }
  };

  //generate the jsx for when not editing
  const generateUserInfo = () => {
    return (
      loginData &&
      userData && (
        <div>
          <p>
            Name: {loginData.firstName} {loginData.lastName}{" "}
          </p>
          <p>Email: {userData.email} </p>
          <p>City: {loginData.city} </p>
          <p>State: {loginData.state} </p>
          <p>Zipcode: {loginData.zipcode}</p>
          <Form>
            <Button variant="primary" onClick={toggleEditing}>
              Edit Profile
            </Button>
          </Form>
        </div>
      )
    );
  };

  //generate the jsx for when editing fields
  const generateEditing = () => {
    return (
      <div>
        <Form
          onSubmit={handleSubmit}
          noValidate
          className="mx-auto"
          style={{ width: "31.8vw", minWidth: "250px" }}
        >
          <Form.Group controlId="formBasicFirstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={loginData.firstName}
              name="firstName"
              isInvalid={!!errors.firstName}
              style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={loginData.lastName}
              name="lastName"
              isInvalid={!!errors.lastName}
              style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicCity">
            <Form.Label>City</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={loginData.city}
              name="city"
              style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicState">
            <Form.Label>State</Form.Label>
            <Form.Control
              as="select"
              defaultValue={loginData.state}
              aria-label="State"
              name="state"
              aria-describedby="basic-addon2"
              onChange={handleChange}
              style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}
            >
              {STATE_ABBREVIATIONS.map((state) => (
                <option key={state}>{state}</option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicZipcode">
            <Form.Label>Zipcode</Form.Label>
            <Form.Control
              onChange={handleChange}
              value={loginData.zipcode}
              name="zipcode"
              type="number"
              style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Save Changes
          </Button>
        </Form>
      </div>
    );
  };

  return (
    <Container>
      <h2 className="mx-auto" style={{ width: "50%", marginTop: "5%" }}>
        My Profile:
      </h2>
      {editing ? generateEditing() : generateUserInfo()}

      <h2 className="mx-auto" style={{ width: "50%", marginTop: "5%" }}>
        Current Interests:
      </h2>
      {!userInterests.length ? (
        <p> No Current Interests </p>
      ) : (
        <Table
          striped
          bordered
          hover
          style={{ width: "31.8vw", minWidth: "250px", margin: "auto" }}
        >
          <tbody>{generateInterests()}</tbody>
        </Table>
      )}
      <Link to={`/survey/`}>Add Interests</Link>
    </Container>
  );
};
