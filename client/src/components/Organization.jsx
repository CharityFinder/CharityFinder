import React from 'react'
import { Card } from 'react-bootstrap'
import { Favorite } from '../components/Favorite'
import "../styles/Search.css"

export const Organization = ({name}) => {
    return (
        <Card className="column" border="warning" style={{margin: 5, }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>

          </Card.Text>
          <Favorite />
        </Card.Body>
      </Card>
    )
}
