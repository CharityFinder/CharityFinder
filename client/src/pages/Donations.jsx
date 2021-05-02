import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Organization } from "../components/Organization";
import { Container, Row, } from "react-bootstrap";
import { UserContext } from "../utils/auth";

export const Donations = () => {
    const [contributions, setContributions] = useState({"Feeding America":"$20", "Ocean Conservacy":"$20","Education Through Music":"$20","Direct Relief":"$20"});

    const generateContributions = () => {
        let temp = [];
        for (const [key, value] of Object.entries(contributions)) {
            temp.push(<li>{key}: {value} </li>);
            console.log(key, value);
        }
        return temp;
    }

    return (
        <Container>
            <h2 className="mx-auto" style={{width:"50%", paddingTop: 60, marginTop: "5%",}}>My Donations:</h2>
            Total Contributions: {generateContributions()}

        </Container>
    )
}
