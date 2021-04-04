import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../utils/auth";
import axios from "axios";
import { Organization } from "../components/Organization";

export const Search = () => {
    const [organizations, setOrganization] = useState(""); /* REST API enpoint */
    const getOrganization = async () => {
        const res = await axios.get(`/api/cn/organizations`);
        setOrganization(res.data);
        console.log(res.data);
    };

    useEffect(() => {
        (async () => {
            await getOrganization();
        })();
    }, []);

    const generateOrganization = () => {
        if (organizations.length === 0) {
          return "No Results";
        }
        else {
          return organizations.map(organization => {
              return <Organization key={organization.ein} name={organization.charityName} />
          });
        }
      }

    return (
        <div>
            <h2>{generateOrganization()}</h2> Server-side message
        </div>
    )
}

