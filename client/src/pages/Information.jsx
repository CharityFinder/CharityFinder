import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import queryString from 'query-string'
import { Container, Row, } from "react-bootstrap";
import { UserContext } from "../utils/auth";
import { Favorite } from '../components/Favorite'
import { Organization } from '../components/Organization';


export const Information = (props) => {
    const { user } = useContext(UserContext);
    const [userFavorites, setUserFavorites] = useState([]);
    const [info, setInfo] = useState([]);

    const params = queryString.parse(props.location.search, {
        parseBooleans: true
      });
    
    const {ein} = params;

    const getInfo = async () => {
        const res = await axios.get(`/api/cn/organizations/` + ein);
        setInfo(res.data);
    }

    useEffect(() => {
        (async () => {
            await getInfo();
        })();
    }, [userFavorites]);

    // TODO: make new card component for this page specifically
    const generateCard = () => {
        return <Organization key={ein} name={info.charityName} ein={ein} />
    }

    return (
        <Container>
            <h2 className="mx-auto" style={{width:"50%", paddingTop: 60, marginTop: "5%",}}>Information: </h2>
            <Row>{generateCard()}</Row>
        </Container>
    )
}
