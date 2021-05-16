import React, { useState, useEffect } from "react";
import { Card as BootstrapCard } from "react-bootstrap";
import { Favorite } from "../components/Favorite";
import "../styles/BigCard.css";
import { FiveStars } from "./FiveStars";
import { ArrowUpRightCircleFill } from "react-bootstrap-icons";
import { Ratings } from "./Ratings";

export const Card = ({ name, ein, isFavorited, organization }) => {
  const [mailingAddress, setMailingAddress] = useState({
    city: "",
    stateOrProvince: "",
    postalCode: "",
  }); //used so that you don't try to render data before it is loaded

  console.log("BLOB", organization);
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
    <BootstrapCard className="column bigcard" style={{ margin: 5 }}>
      <BootstrapCard.Body>
        <BootstrapCard.Title>
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
          {organization.tagLine} <br />
          <br />
          <br />
          <br />
          {mailingAddress["city"] +
            ", " +
            mailingAddress["stateOrProvince"] +
            " " +
            mailingAddress["postalCode"]}{" "}
          <br />
          <br />
        </BootstrapCard.Text>
        <Favorite
          name={name}
          ein={ein}
          isFavorited={isFavorited}
          organization={organization}
        />

        {organization && organization.category && organization.cause ? (
          <>
            {organization.category.image && (
              <img src={organization.category.image} alt="category" />
            )}
            {organization.cause.image && (
              <img src={organization.cause.image} alt="cause" />
            )}
            {organization.category.categoryName && (
              <p>Category Name: {organization.category.categoryName}</p>
            )}
            {organization.cause.causeName && (
              <p>Cause Name: {organization.cause.causeName}</p>
            )}
            {organization.activeAdvisories._rapid_links.related && (
              // TODO: ACCOUNT FOR MULTIPLE ACTIVE ADVISORIES
              <div className="bg-red">
                <a
                  href={organization.activeAdvisories._rapid_links.related}
                  rel="noreferrer"
                  target="_blank"
                >
                  RED ACTIVE ADVISORY
                </a>
              </div>
            )}
            {organization.removedAdvisories._rapid_links.related && (
              // TODO: ACCOUNT FOR MULTIPLE ACTIVE ADVISORIES
              <div className="bg-red">
                <a
                  href={organization.activeAdvisories._rapid_links.related}
                  rel="noreferrer"
                  target="_blank"
                >
                  PAST ADVISORY
                </a>
              </div>
            )}
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
            {organization.charityNavigatorURL && (
              <a
                href={organization.charityNavigatorURL}
                rel="noreferrer"
                target="_blank"
              >
                Find out more about ratings on Charity Navigator
              </a>
            )}
            {/* TODO: FIX RATING IMAGE PROBLEM */}
            {organization.ratingImage && organization.ratingImage.small && (
              <img src={organization.ratingImage.small} alt="cnRatingimg" />
            )}

            {organization.irsClassification && (
              <div className="irs-info">
                IRS CLASSIFICATION STUFF{" "}
                {Object.entries(organization.irsClassification).map(
                  ([key, value]) => {
                    const name = key
                      .replace(/([a-z])([A-Z])/g, "$1 $2")
                      .replace(/ntee/, "NTEE");
                    return value ? (
                      <p>
                        <span style={{ textTransform: "capitalize" }}>
                          {name}:
                        </span>{" "}
                        {value}
                      </p>
                    ) : null;
                  }
                )}
                IT BEGGGINNNNS
                {organization.irsClassification.accountingPeriod && (
                  <p>
                    Accounting Period:{" "}
                    {organization.irsClassification.accountingPeriod}
                  </p>
                )}
                {organization.irsClassification.subsection && (
                  <p>Subsection: {organization.irsClassification.subsection}</p>
                )}
                {/* TODO: DISPLAY AS MONETARY VALUE */}
                {organization.irsClassification.incomeAmount && (
                  <p>
                    Income Amount: {organization.irsClassification.incomeAmount}
                  </p>
                )}
                {organization.irsClassification.deductibility && (
                  <p>
                    Deductibility:{" "}
                    {organization.irsClassification.deductibility}
                  </p>
                )}
                {organization.irsClassification.exemptOrgStatus && (
                  <p>
                    Exempt Organization Status:{" "}
                    {organization.irsClassification.exemptOrgStatus}
                  </p>
                )}
                {organization.irsClassification.filingRequirement && (
                  <p>
                    Filing Requirement:{" "}
                    {organization.irsClassification.filingRequirement}
                  </p>
                )}
                {organization.irsClassification.foundationStatus && (
                  <p>
                    Foundation Status:{" "}
                    {organization.irsClassification.foundationStatus}
                  </p>
                )}
                {organization.irsClassification.affiliation && (
                  <p>
                    Affiliation: {organization.irsClassification.affiliation}
                  </p>
                )}
              </div>
            )}
            {organization.mailingAddress.streetAddress1 && (
              <p>
                Street Address: {organization.mailingAddress.streetAddress1}
              </p>
            )}
            {organization.mailingAddress.postalCode && (
              <p>Postal Code: {organization.mailingAddress.postalCode}</p>
            )}
          </>
        ) : null}
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};
