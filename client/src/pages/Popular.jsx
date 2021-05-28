import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Organization } from "../components/Organization";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "../utils/auth";

export const Popular = () => {
  const { user } = useContext(UserContext);
  const [organizations, setOrganization] = useState([]); /* REST API enpoint */
  const [userFavorites, setUserFavorites] = useState([]);

  useEffect(() => {
    const getFavorites = async () => {
      const res = await axios.get("/api/favorites", {
        params: {
          userId: user.uid,
        },
      });
      setUserFavorites(res.data || []);
    };
    getFavorites();
  }, [user]);

  useEffect(() => {
    const getPopular = async () => {
      const res = await axios.get("/api/stats");
      setOrganization(res.data || []);
    };
    getPopular();
  }, []);

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
      return (
        organizations &&
        organizations.map((organization, idx) => {
          if (idx + 1 < 4) {
            return (
              <Organization
                key={organization.orgId}
                name={organization.orgName}
                ein={organization.orgId}
                isFavorited={checkFavorited(organization.orgId)}
                number={idx + 1}
                organization={organization}
                numFavorited={organization.totalFavorites}
              />
            );
          } else {
            return (
              <Organization
                key={organization.orgId}
                name={organization.orgName}
                ein={organization.orgId}
                isFavorited={checkFavorited(organization.orgId)}
                organization={organization}
                numFavorited={organization.totalFavorites}
              />
            );
          }
        })
      );
    }
  };

  return (
    <Container style={{ paddingTop: 60, paddingBottom: 83 }}>
      <Row style={{ display: "flex" }}>{generateOrganizations()}</Row>
    </Container>
  );
};
