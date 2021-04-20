import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../utils/auth";
import { Container, Form } from "react-bootstrap";
import { Button } from "../components/Button";
import { Checkbox } from "../components/Checkbox";
import "../styles/Form.css";
import { useHistory } from "react-router-dom";

export const Survey = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);

  // TODO: should probably pull which ones they already have checked and set those to checked
  const [checkboxData, setCheckboxData] = useState(["init"]);
  const [initCauses, setInitCauses] =  useState(null); //used to know what to delete later on

  useEffect(() => {
    const getInterests = async () => {
      const res = await axios.get('/api/interests', {
        params: {
          userId: user.uid
        }
      })
      setInitCauses(res.data);
      setCheckboxData(res.data.map((element)=> {
        return element["causeName"];
      }));
    }

    if (checkboxData.length === 1 && checkboxData[0] === "init") {
      getInterests();
    }
  }, [checkboxData, user])

  const removeInterests = async (interestId, causeName) => {
    console.log("removing interests");
    await axios.delete('/api/interests/' + interestId, {
      params: {
        causeName: causeName
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkboxData.length !== 0) {
      initCauses.forEach(element => {
        removeInterests(element.id, element.causeName);
      });
      setInterests();
    }
    else {
      console.log("User did not input anything");
    }
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

  const addInterest = async (inputId, inputName) => {
    await axios.post('/api/interests', null, {
      params: {
        userId: user.uid,
        causeId: inputId,
        causeName: inputName
      }
    })
  }

  const setInterests = async () => {
    checkboxData.forEach(element => {
      addInterest("111", element);
    });
    history.push("/search");
  }

  return (
    <Container className="jumbotron vertical-center shadow-container shadow-lg" >

      <h1 className="mt-0">Charity Finder</h1>
      <p>What areas are you passionate about?</p>  

      <Form onSubmit={handleSubmit} noValidate className="mx-auto" style={{width: "240px"}}>
        <div key='default-checkbox' className="mb-3 mx-auto" style={{width: "50%"}}>
          <Checkbox inputLabel="Healthcare" inputOnChange={handleChange} inputChecked={checkboxData}/>
          <Checkbox inputLabel="Education" inputOnChange={handleChange} inputChecked={checkboxData}/>
          <Checkbox inputLabel="Environment" inputOnChange={handleChange} inputChecked={checkboxData}/>
          <Checkbox inputLabel="Food Scarcity" inputOnChange={handleChange} inputChecked={checkboxData}/>
          <Checkbox inputLabel="Animal Rights" inputOnChange={handleChange} inputChecked={checkboxData}/>
        </div>
        <Form.Group>
          <Button text="Submit"/>
        </Form.Group>
      </Form>
    </Container>
  )
}
