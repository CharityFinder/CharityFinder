import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../utils/auth";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Organization } from "../components/Organization";
import "../styles/Search.css"
import { InputGroup, FormControl, Button, Container, Row } from "react-bootstrap";

export const Search = () => {
    const history = useHistory();
    const [organizations, setOrganization] = useState([]); /* REST API enpoint */
    const [searchData, setSearchData] = useState("");
    const [hasSearched, setHasSearched] = useState(false);

    const getOrganization = async () => {
        const res = await axios.get(`/api/cn/organizations`, {
            params: {
              search: "feeding america"
            }
          });
        setOrganization(res.data);
    };

    const getSearchResults = async () => {
        const res = await axios.get('/api/cn/organizations', {
            body: {
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
        console.log(searchData);
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
          <InputGroup onChange={handleChange} className="mx-auto" style={{width:"50%", paddingTop: 60, marginTop: "5%",}}>
            <FormControl 
                placeholder="Search for a Charity"
                aria-label="Search for a Charity"
                aria-describedby="basic-addon2"
            />
            <InputGroup.Append>
                <Button onClick={handleSubmit} noValidate variant="outline-secondary" type="submit">Search</Button>
            </InputGroup.Append>
        </InputGroup>
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

