import React, { useState, useEffect } from 'react'
import { Card as BootstrapCard } from 'react-bootstrap'
import { Favorite } from '../components/Favorite'
import "../styles/BigCard.css"

export const Card = ({name, ein, isFavorited, organization}) => {
  const [mailingAddress, setMailingAddress] = useState({city: "LOADING", stateOrProvince: "", postalCode: ""}); //used so that you don't try to render data before it is loaded

  useEffect(() => {
    if (organization.length !== 0) {
      setMailingAddress({city: organization.mailingAddress.city, stateOrProvince: organization.mailingAddress.stateOrProvince, postalCode: organization.mailingAddress.postalCode});
    }
  }, [organization]);

  return (
    <BootstrapCard className="column bigcard" style={{margin: 5}}>
      <BootstrapCard.Body>
        <BootstrapCard.Title>{name}</BootstrapCard.Title>
        <BootstrapCard.Text>
          {organization.tagLine} <br /><br />
          {organization.mission} <br /><br />
          {mailingAddress["city"] + ", " + mailingAddress["stateOrProvince"] + " " + mailingAddress["postalCode"]} <br /><br />
        </BootstrapCard.Text>
        <Favorite name={name} ein={ein} isFavorited={isFavorited} organization={organization} />
        <a href={organization.websiteURL} rel="noreferrer" target='_blank' style={{textAlign:"center", position:"absolute", bottom:25, left: 25}}>
          Link to Website
        </a>
      </BootstrapCard.Body>
    </BootstrapCard>
  )
}
