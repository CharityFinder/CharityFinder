import React from 'react'
import { Card } from 'react-bootstrap'

export const Organization = ({name}) => {
    return (
        <Card border="warning" style={{ width: '18rem' }}>
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
