import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import queryString from "query-string";
import { Favorite } from "../components/Favorite";
import "../styles/Cards.css";

export const Organization = ({
  name,
  ein,
  isFavorited,
  organization,
  numFavorited,
  number,
}) => {
  return (
    <Card className="column" style={{ margin: 5 }}>
      <Card.Body>
        <Card.Title>
          {number ? (
            <span style={{ color: "var(--primary)" }}>#{number} </span>
          ) : (
            ""
          )}
          {name}
        </Card.Title>
        <Card.Text>
          {organization.tagLine}
          {numFavorited ? (
            <>
              <br />
              <span style={{ padding: "1rem" }}>Favorites:</span>
            </>
          ) : (
            ""
          )}{" "}
          {numFavorited}
        </Card.Text>
        <Favorite
          name={name}
          ein={ein}
          isFavorited={isFavorited}
          organization={organization}
        />
        <Link
          to={`/information/?${queryString.stringify({ ein })}`}
          style={{
            textAlign: "center",
            position: "absolute",
            bottom: 25,
            left: 89.5,
          }}
        >
          Learn More
        </Link>
      </Card.Body>
    </Card>
  );
};
