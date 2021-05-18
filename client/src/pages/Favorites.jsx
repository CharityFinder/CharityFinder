import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Organization } from "../components/Organization";
import { Container, Row } from "react-bootstrap";
import { UserContext } from "../utils/auth";

export const Favorites = () => {
  const { user } = useContext(UserContext);
  const [userFavorites, setUserFavorites] = useState([]);

  console.log("Favorites user", user);
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

  const generateFavorites = () => {
    if (userFavorites.length === 0) {
      return "No Favorites";
    } else {
      return userFavorites.map((userFavorite) => (
        <Organization
          key={userFavorite.orgId}
          name={userFavorite.orgName}
          ein={userFavorite.orgId}
          isFavorited={userFavorite.id}
          organization={userFavorite}
        />
      ));
    }
  };

  return (
    <Container>
      <h2 className="mx-auto" style={{ width: "50%", paddingTop: "5rem" }}>
        User Favorites:{" "}
      </h2>
      <Row>{generateFavorites()}</Row>
    </Container>
  );
};
