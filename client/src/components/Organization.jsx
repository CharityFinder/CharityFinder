import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Favorite } from '../components/Favorite'
import "../styles/Search.css"

export const Organization = ({name, ein, isFavorited}) => {
    return (
        <Card className="column" border="warning" style={{margin: 5, }}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            cause
          </Card.Text>
          <Favorite name={name} ein={ein} isFavorited={isFavorited}/>
          <Link to={`/information/?${queryString.stringify({ein})}`}>More</Link>
        </Card.Body>
      </Card>
    )
}
