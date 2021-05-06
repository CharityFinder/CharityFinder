import React, { useState } from "react";
import { Icon } from "../images/icons";

export const SurveyCard = ({ icon, cause, causeID, updateSelection }) => {
  const [selectedCard, setSelectedCard] = useState(false);

  const handleSelection = () => {
    console.log("id", causeID);
    updateSelection(causeID);
    setSelectedCard((prevSelectedCard) => !prevSelectedCard);
  };

  return (
    <div className={`card ${selectedCard} m-2`} onClick={handleSelection}>
      <Icon icon={icon} />
      <p className="cause">{cause}</p>
    </div>
  );
};
