import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Organization } from "../components/Organization";
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

    const getSearchResults = async () => {
        const res = await axios.get('/api/cn/organizations', {
            params: {
                search: searchData,
                rated: true
            }
        });
        setOrganization(res.data);
    }

    useEffect(() => {
        const getSuggestions = async () => {
            const res = await axios.get('/api/cn/suggestions', {
                params: {
                    userId: user.uid
                }
            });

            setOrganization(res.data);
        };

        (async () => {
            await getSuggestions();
        })();
    }, [user]);

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
                return <Organization key={organization.ein} name={organization.charityName} ein={organization.ein} isFavorited={checkFavorited(organization.ein) } organization={organization} />
            });
        }
    }

    return ( 
        <Container style={{paddingTop: 60, paddingBottom: 83, }}>
            <div>
                <br />
            </div>
            <Form onSubmit={handleSubmit} noValidate> 
                <InputGroup onChange={handleChange} className="mx-auto" style={{width:"50%", paddingTop: 30,}}>
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

