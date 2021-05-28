import React, { useState, useEffect, useContext, useCallback } from "react";
import axios from "axios";
import { Container, Table, Form, Button } from "react-bootstrap";
import { UserContext } from "../utils/auth";

export const Donations = () => {
  const { user } = useContext(UserContext);
  const [donationData, setDonationData] = useState({ name: "", amount: 0 });
  const [errors, setErrors] = useState({});
  const [contributions, setContributions] = useState([]);

  const refreshDonations = useCallback(async () => {
    const res = await axios.get("/api/donations", {
      params: {
        userId: user.uid,
      },
    });
    setContributions(res.data || []);
  }, [user.uid]);

  //get all donations that the user currently has
  useEffect(() => {
    refreshDonations();
  }, [user, refreshDonations]);

  // finds form errors
  const findFormErrors = () => {
    const { name, amount } = donationData;
    const newErrors = {};
    // name errors
    if (!name) newErrors.name = "cannot be blank!";
    // donation errors
    if (!parseInt(amount)) newErrors.amount = "cannot be blank!";

    return newErrors;
  };

  const handleChange = (e) => {
    setDonationData({
      ...donationData,
      [e.target.name]: e.target.value,
    });
    // Check and see if errors exist, and remove them from the error object:
    if (!!errors[e.target.name])
      setErrors({
        ...errors,
        [e.target.name]: null,
      });
  };

  //should make an axios call to add a donation to the user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = findFormErrors();
    if (Object.keys(newErrors).length > 0) {
      // We got errors!
      setErrors(newErrors);
    } else {
      // No errors! Put any logic here for the form submission!
      await axios.post("/api/donations", null, {
        params: {
          orgName: donationData.name,
          donationAmount: donationData.amount,
          userId: user.uid,
        },
      });
      refreshDonations();
    }
  };

  //deletes donations and refreshes view
  const handleDelete = async (id) => {
    await axios.delete("/api/donations/" + id, {
      params: {
        donationId: id,
      },
    });
    refreshDonations();
  };

  // parses through contributions and sums up results
  const getTotalContributions = () => {
    let retVal = 0;
    contributions &&
      Array.prototype.forEach.call(contributions, (c) => {
        retVal += parseInt(c.donationAmount);
      });
    // contributions.forEach((contribution) => {
    //     retVal += parseInt(contribution.donationAmount);
    //   });
    return retVal;
  };

  const generateContributions = () => {
    return (
      contributions &&
      contributions.map((contribution) => {
        return (
          <tr key={contribution.id}>
            <td>{contribution.orgName}</td>
            <td>${contribution.donationAmount}</td>
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
                  handleDelete(contribution.id);
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

  return (
    <Container>
      <h2 className="mx-auto" style={{ width: "50%", marginTop: "5%" }}>
        Add Donations:
      </h2>
      <Form
        onSubmit={handleSubmit}
        className="mx-auto"
        style={{ width: "31.8vw", minWidth: "250px" }}
      >
        <Form.Group controlId="formGroupOrganization">
          <Form.Label>Organization Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            placeholder="Enter Organization Name"
            style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
        </Form.Group>
        <Form.Group controlId="formGroupDonation">
          <Form.Label>Amount Donated</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            placeholder="Enter Amount Donated"
            style={{ border: "1px solid #ced4da", borderRadius: ".25rem" }}
            onChange={handleChange}
            isInvalid={!!errors.amount}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      <h2 className="mx-auto" style={{ width: "50%", marginTop: "5%" }}>
        My Donations:
      </h2>
      Total Contributions: ${getTotalContributions()}
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
