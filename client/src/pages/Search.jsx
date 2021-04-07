import React, { useState, useEffect } from "react";
import axios from "axios";
import { Organization } from "../components/Organization";
import "../styles/Search.css"
import { InputGroup, FormControl, Button, Container, Row, Form } from "react-bootstrap";

export const Search = () => {
    const [organizations, setOrganization] = useState([]); /* REST API enpoint */
    const [searchData, setSearchData] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    // This should become recommendations later on
    const getOrganization = async () => {
        const res = await axios.get(`/api/cn/organizations`);
        setOrganization(res.data);
    };

    const getSearchResults = async () => {
        const res = await axios.get('/api/cn/organizations', {
            params: {
                search: searchData
            }
        })
        setOrganization(res.data);
    }

    useEffect(() => {
        (async () => {
            await getOrganization();
        })();
    }, []);

    /* Search */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSearched(true);
        getSearchResults();
    };

    const handleChange = (e) => {
        setSearchData(e.target.value);
    };

    const generateOrganizations = () => {
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
            <Form onSubmit={handleSubmit} noValidate> 
                <InputGroup onChange={handleChange} className="mx-auto" style={{width:"50%", paddingTop: 60, marginTop: "5%",}}>
                    <FormControl 
                        placeholder="Search for a Charity"
                        aria-label="Search for a Charity"
                        aria-describedby="basic-addon2"
                    />
                    <InputGroup.Append>
                        <Button variant="outline-secondary" type="submit">Search</Button>
                    </InputGroup.Append>
                </InputGroup>
            </Form>

        {!hasSearched ?
            <>
            Recommendations
            </>
            :
            <>
            Results
            </>
        }
        <Row>{generateOrganizations()}</Row>
    
        </Container>
    )
}

