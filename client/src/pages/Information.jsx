import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import queryString from "query-string";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "../utils/auth";
import { Card } from "../components/Card";

export const Information = (props) => {
  const { user } = useContext(UserContext);
  const [info, setInfo] = useState([]);
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
  }, [user]);

  const params = queryString.parse(props.location.search, {
    parseBooleans: true,
  });

  const { ein } = params;

  useEffect(() => {
    const getInfo = async () => {
      const res = await axios.get(`/api/cn/organizations/` + ein);
      setInfo(res.data);
    };

    (async () => {
      await getInfo();
    })();
  }, [ein]);

  const checkFavorited = (ein) => {
    // checks if this ein exists in userfavorites
    for (let i = 0; i < userFavorites.length; i++) {
      if (ein === userFavorites[i].orgId) {
        return userFavorites[i].id;
      }
    }
    return false;
  };

  const generateCard = () => {
    return (
      <Card
        key={ein}
        name={info.charityName}
        ein={ein}
        isFavorited={checkFavorited(ein)}
        organization={info}
      />
    );
  };

  return (
    <Container>
      <h2
        className="mx-auto"
        style={{ width: "50%", paddingTop: 60, marginTop: "5%" }}
      >
        Information:{" "}
      </h2>
      <Row>{generateCard()}</Row>
    </Container>
  );
};
