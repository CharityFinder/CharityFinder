import React from 'react'
import { Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import { Favorite } from '../components/Favorite'
import "../styles/Cards.css"

export const Organization = ({name, ein, isFavorited, organization}) => {
    return (
        <Card className="column" style={{margin: 5}}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {organization.tagLine}
          </Card.Text>
          <Favorite name={name} ein={ein} isFavorited={isFavorited} organization={organization} />
          <Link to={`/information/?${queryString.stringify({ein})}`} style={{textAlign:"center", position:"absolute", bottom:25, left: 89.5}}>
            Learn More
          </Link>
        </Card.Body>
      </Card>
    )
}
