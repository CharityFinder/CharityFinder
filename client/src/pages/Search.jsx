import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../utils/auth";
import axios from "axios";
import { Organization } from "../components/Organization";
import "../styles/Search.css"
import { Container, Row } from "react-bootstrap"

import { InputGroup, FormControl, Button } from "react-bootstrap";

export const Search = () => {
    const [organizations, setOrganization] = useState(""); /* REST API enpoint */
    const getOrganization = async () => {
        const res = await axios.get(`/api/cn/organizations`);
        setOrganization(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        (async () => {
            await getOrganization();
        })();
    }, []);

    const generateOrganization = () => {
        if (organizations.length === 0) {
          return "No Results";
        }
        else {
          return organizations.map(organization => {
              return <Organization key={organization.ein} name={organization.charityName} />
          });
        }
      }

    return ( 
        <Container style={{paddingTop: 60, paddingBottom: 83, }}>
          <InputGroup className="mx-auto" style={{width:"50%", paddingTop: 60, marginTop: "5%",}}>
            <FormControl 
                placeholder="Search for a Charity"
                aria-label="Search for a Charity"
                aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
                <Button variant="outline-secondary">Search</Button>
            </InputGroup.Append>
        </InputGroup>
            Recommendations 
            <Row>{generateOrganization()}</Row>
        </Container>
    )
}

