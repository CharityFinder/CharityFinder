import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../utils/auth";
import { addInterest } from "../utils/services";
import { CAUSES } from "../utils/constants";
import { SurveyCard } from "../components/SurveyCard";
import { Button } from "react-bootstrap";
import "../styles/Survey.css";

export const Survey = () => {
  const history = useHistory();
  const { user } = useContext(UserContext);
  const [causeSelected, setCauseSelected] = useState([]);

  const updateSelection = (selectedId) => {
    if (causeSelected && causeSelected.includes(selectedId)) {
      // remove selected
      setCauseSelected((prevCauses) => {
        const index = prevCauses.indexOf(selectedId);
        prevCauses.splice(index, 1);
        return prevCauses;
      });
    } else {
      // add selected
      setCauseSelected((prevCauses) => {
        prevCauses.push(selectedId);
        return prevCauses;
      });
    }
  };

  /* TODO: ADD UPDATE/REMOVE INTERESTS IN PROFILE */
  const handleAddInterests = async () => {
    await addInterest(user.uid, causeSelected);
    history.push("/search");
  };

  return (
    <div className="interests-survey">
      <p>What causes are you passionate about?</p>
      <div className="options">
        {CAUSES.map((e, idx) => (
          <SurveyCard
            key={idx}
            icon={e.img}
            cause={e.causeName}
            causeID={e.causeId}
            updateSelection={updateSelection}
          />
        ))}
      </div>
      <Button className="submit-survey" onClick={handleAddInterests}>
        Show me suggestions
      </Button>
    </div>
  );
};
