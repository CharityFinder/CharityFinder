import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Organization } from "../components/Organization";
import { Container, Row, } from "react-bootstrap";
import { UserContext } from "../utils/auth";

export const About = () => {
  return (
    <Container>
        <div >
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>

        <div className="about" style={{marginBottom:"100px"}}> 
        <h1 className="mt-0">About Us</h1>
        <p>
        
        </p>
        <p>With CharityFinder, we plan to make it easier for individuals to find and engage 
        with relevant information about each charity organization by giving them a platform where they can 
        easily search information about organizations and narrow down the charities they would like to contribute to.
        </p>
        <p>
        <p>- Remove the hassle of finding charitable organizations that you’re passionate about with CharityFinder</p>

        <p>- Search through 1000s of charitable organizations</p>

        <p>- Get recommendations for charities that match your passions</p>

        <p>- Keep track of your favorite organizations</p>
        </p>
        <p>
            This app was developed by a group of motivated college students.   
        </p>
            <p>Shania Dhani: <a href="https://github.com/sdhani">https://github.com/sdhani</a></p>
            <p>Xing Tao Shi: <a href="https://github.com/xshi0603">https://github.com/xshi0603</a></p>
            <p>Darren Liang: <a href="https://github.com/dliang2">https://github.com/dliang2</a></p>
            <p>Jessica Wong: <a href="https://github.com/wongjessica">https://github.com/wongjessica</a>
        </p>
        </div>
    </Container>
  )
}
