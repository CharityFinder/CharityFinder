import React from 'react'
import { Card } from 'react-bootstrap'
import "../styles/Search.css"

export const Organization = ({name}) => {
    return (
        <Card className="column" border="warning" style={{ width: 'auto', margin: 5, }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the bulk
            of the card's content.
          </Card.Text>
        </Card.Body>
      </Card>
    )
}
