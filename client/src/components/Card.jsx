import React, { useState, useEffect } from "react";
import { Card as BootstrapCard } from "react-bootstrap";
import { Favorite } from "../components/Favorite";
import { TagContainer } from "./TagContainer";
import { ArrowUpRightCircleFill } from "react-bootstrap-icons";
import { Ratings } from "./Ratings";
import "../styles/BigCard.css";

export const Card = ({ name, ein, isFavorited, organization }) => {
  const [mailingAddress, setMailingAddress] = useState({
    city: "",
    stateOrProvince: "",
    postalCode: "",
  }); //used so that you don't try to render data before it is loaded

  useEffect(() => {
    if (organization.length !== 0) {
      setMailingAddress({
        city: organization.mailingAddress.city,
        stateOrProvince: organization.mailingAddress.stateOrProvince,
        postalCode: organization.mailingAddress.postalCode,
      });
    }
  }, [organization]);

  return (
    <BootstrapCard className="column bigcard">
      <BootstrapCard.Body>
        <BootstrapCard.Title style={{ marginBottom: "0" }}>
          {name}{" "}
          <a
            href={organization.websiteURL}
            rel="noreferrer"
            target="_blank"
            title="Visit their website"
          >
            <ArrowUpRightCircleFill />
          </a>
        </BootstrapCard.Title>
        <BootstrapCard.Text>
          <p className="tagline">{organization.tagLine} </p>
          <p className="address">
            {mailingAddress["city"] +
              ", " +
              mailingAddress["stateOrProvince"] +
              " " +
              mailingAddress["postalCode"]}{" "}
          </p>
          {organization && organization.currentRating ? (
            <>
              <Ratings
                ratings={[
                  {
                    title: "Accountability",
                    rating:
                      organization.currentRating.accountabilityRating.rating,
                  },
                  {
                    title: "Financial",
                    rating: organization.currentRating.financialRating.rating,
                  },
                ]}
              />
              {organization.mission}

              {organization.irsClassification && (
                <div className="irs-info">
                  <h5>IRS Classification</h5>

                  {organization.irsClassification.subsection && (
                    <TagContainer
                      title={"Subsection"}
                      info={organization.irsClassification.subsection}
                    />
                  )}
                  {/* TODO: DISPLAY AS MONETARY VALUE */}
                  {organization.irsClassification.incomeAmount && (
                    <TagContainer
                      title={"Income Amount"}
                      info={organization.irsClassification.incomeAmount}
                    />
                  )}
                  {organization.irsClassification.deductibility && (
                    <TagContainer
                      title={"Deductibility"}
                      info={organization.irsClassification.deductibility}
                    />
                  )}
                  {organization.irsClassification.foundationStatus && (
                    <TagContainer
                      title={"Foundation Status"}
                      info={organization.irsClassification.foundationStatus}
                    />
                  )}
                </div>
              )}
            </>
          ) : null}
        </BootstrapCard.Text>

        <Favorite
          name={name}
          ein={ein}
          isFavorited={isFavorited}
          organization={organization}
        />
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};
