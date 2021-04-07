import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import "../styles/Form.css";

export const Survey = () => {

  const [checkboxData, setCheckboxData] = useState([]);

  const handleSubmit = async (e) => {
    console.log(checkboxData);
  };

  const handleChange = (e) => {
    if (e.target.checked === false) {
      setCheckboxData(previousCheckboxData => {
        return previousCheckboxData.filter(function(checkbox) {
          return checkbox !== e.target.name
        })
      })
    }
    else {
      setCheckboxData(
        [...checkboxData, e.target.name]
      );
    }
  };

  return (
    <Container className="jumbotron vertical-center shadow-container shadow-lg" >

      <h1 className="mt-0">Charity Finder</h1>
      <p>What areas are you passionate about?</p>  

      {/* TODO: remove onMouseEnter and swap to onSubmit */}
      <Form onMouseEnter={handleSubmit} noValidate className="mx-auto" style={{width: "240px"}}>
        <div key='default-checkbox' className="mb-3 mx-auto" style={{width: "50%"}}>
          <Checkbox inputLabel="Healthcare" inputOnChange={handleChange} />
          <Checkbox inputLabel="Education" inputOnChange={handleChange} />
          <Checkbox inputLabel="Environment" inputOnChange={handleChange} />
          <Checkbox inputLabel="Food Scarcity" inputOnChange={handleChange} />
          <Checkbox inputLabel="Animal Rights" inputOnChange={handleChange} />
        </div>
        <Form.Group>
          <Button text="Submit"/>
        </Form.Group>
      </Form>
    </Container>
  )
}
