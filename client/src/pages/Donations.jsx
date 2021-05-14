import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Organization } from "../components/Organization";
import { Container, Row, Table, Form, Button } from "react-bootstrap";
import { UserContext } from "../utils/auth";

export const Donations = () => {
  const { user } = useContext(UserContext);
  const [contributions, setContributions] = useState({});

  useEffect(() => {
    const getDonations = async () => {
      const res = await axios.get("/api/donations", {
        params: {
          userId: user.uid,
        },
      });
      console.log(res.data);
      // setContributions(res.data);
    };

    getDonations();
  }, [user]);

  const addContributions = () => {};

  const generateContributions = () => {
    let temp = [];
    for (const [key, value] of Object.entries(contributions)) {
      temp.push(
        <tr>
          <td>{key}</td>
          <td>{value}</td>
        </tr>
      );
      console.log(key, value);
    }
    return temp;
  };

  return (
    <Container>
      <Form>
        <Form.Group controlId="formGroupEmail" >
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" style={{border:"1px solid #ced4da", borderRadius:".25rem"}}/>
        </Form.Group>
        <Form.Group controlId="formGroupPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" style={{border:"1px solid #ced4da", borderRadius:".25rem"}}/>
        </Form.Group>
        <Button variant="primary" type="submit">
            Submit
        </Button>
      </Form>


      <h2
        className="mx-auto"
        style={{ width: "50%", paddingTop: 60, marginTop: "5%" }}
      >
        My Donations:
      </h2>
      Total Contributions:
      <Table
        striped
        bordered
        hover
        style={{ width: "31.8vw", minWidth: "250px", margin: "auto" }}
      >
        <tbody>{generateContributions()}</tbody>
      </Table>
    </Container>
  );
};
