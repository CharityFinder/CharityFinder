import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Organization } from "../components/Organization";
import "../styles/Search.css"
import { InputGroup, FormControl, Button, Container, Row, Form } from "react-bootstrap";
import { UserContext } from "../utils/auth";

export const Search = () => {
    const { user } = useContext(UserContext);
    const [organizations, setOrganization] = useState([]); /* REST API enpoint */
    const [searchData, setSearchData] = useState("");
    const [hasSearched, setHasSearched] = useState(false);
    const [userFavorites, setUserFavorites] = useState([]);

    // gets user favorites and passes it down to the organization/favorite component whether or not it is favorited
    useEffect(() => {
      const getFavorites = async () => {
        const res = await axios.get('/api/favorites', {
          params: {
            userId: user.uid
          }
        })
        setUserFavorites(res.data);
      }
  
      getFavorites();
    }, [user]);

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
    }, [userFavorites]);

    /* Search */
    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSearched(true);
        getSearchResults();
    };

    const handleChange = (e) => {
        setSearchData(e.target.value);
    };

    const checkFavorited = (ein) => { // checks if this ein exists in userfavorites
        for (let i = 0; i < userFavorites.length; i++) {
            if (ein === userFavorites[i].orgId) {
                return userFavorites[i].id;
            }
        }
        return false;
    };

    const generateOrganizations = () => {
        if (organizations.length === 0) {
            return "No Results";
        }
        else {
            return organizations.map(organization => {
                return <Organization key={organization.ein} name={organization.charityName} ein={organization.ein} isFavorited={checkFavorited(organization.ein)}/>
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

