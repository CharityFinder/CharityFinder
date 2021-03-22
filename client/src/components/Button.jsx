import React, { useState } from "react";
import { Button as BootstrapButton } from "react-bootstrap";

export const Button = ({text}) => {
  const [hover, setHover] = useState(false);

  const toggleHover = () => {
    setHover(!hover);
  };

  return (
    <>
      {!hover ?
        <BootstrapButton variant="outline-success" type="submit" onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={{
        color: "white", 
        backgroundColor: "#55b298",
        }}>
        {text}
        </BootstrapButton>
        :
        <BootstrapButton variant="outline-success" type="submit" onMouseEnter={toggleHover} onMouseLeave={toggleHover} style={{
          color: "white", 
          backgroundColor: "#59A692",
          }}>
          {text}
        </BootstrapButton>
      }
    </>
  )
}

