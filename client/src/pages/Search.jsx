import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Organization } from "../components/Organization";
import { Container, Row, Form } from "react-bootstrap";
import { UserContext } from "../utils/auth";
import { Searchbar } from "../components/Searchbar";
import { AdvancedSearchbar } from "../components/AdvancedSearchbar";

export const Search = () => {
  const { user } = useContext(UserContext);
  const [organizations, setOrganization] = useState([]); /* REST API enpoint */
  const [searchData, setSearchData] = useState({
    search: "",
    city: "",
    state: "",
  });
  const [hasSearched, setHasSearched] = useState(false);
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
  const [userFavorites, setUserFavorites] = useState([]);

  // gets user favorites and passes it down to the organization/favorite component whether or not it is favorited
  useEffect(() => {
    const getFavorites = async () => {
      const res = await axios.get("/api/favorites", {
        params: {
          userId: user.uid,
        },
      });
      setUserFavorites(res.data);
    };
    getFavorites();

    const getSuggestions = async () => {
      const res = await axios.get("/api/cn/suggestions", {
        params: {
          userId: user.uid,
        },
      });

      setOrganization(res.data);
    };
    getSuggestions();
  }, [user]);

  const getSearchResults = async () => {
    const res = await axios.get("/api/cn/organizations", {
      params: {
        ...searchData,
        rated: true,
      },
    });
    setOrganization(res.data);
  };

  /* Search */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSearched(true);
    getSearchResults();
  };

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const toggleAdvanced = (e) => {
    setIsAdvancedSearch((previousAdvancedValue) => !previousAdvancedValue);
    const newSearchData = {
      search: searchData["search"],
      city: "",
      state: "",
    };
    setSearchData(newSearchData);
  };

  const checkFavorited = (ein) => {
    // checks if this ein exists in userfavorites
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
    } else {
      return organizations.map((organization) => {
        return (
          <Organization
            key={organization.ein}
            name={organization.charityName}
            ein={organization.ein}
            isFavorited={checkFavorited(organization.ein)}
            organization={organization}
          />
        );
      });
    }
  };

  return (
    <Container style={{ paddingTop: 60, paddingBottom: 83 }}>
      <Form onSubmit={handleSubmit} noValidate>
        <Searchbar changeHandler={handleChange} />

        <Form.Check className="mx-auto" type="checkbox">
          <Form.Check.Input
            type="checkbox"
            name="Advanced Search"
            onChange={toggleAdvanced}
          />
          <Form.Check.Label>Advanced Search</Form.Check.Label>
        </Form.Check>
        {isAdvancedSearch && <AdvancedSearchbar changeHandler={handleChange} />}
      </Form>
      {!hasSearched ? <>Recommendations</> : <>Results</>}
      <Row>{generateOrganizations()}</Row>
    </Container>
  );
};
