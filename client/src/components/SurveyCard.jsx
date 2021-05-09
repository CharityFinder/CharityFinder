import React, { useState } from "react";
import { Icon } from "../images/icons";

export const SurveyCard = ({ icon, cause, causeID, updateSelection }) => {
  const [selectedCard, setSelectedCard] = useState(false);

  const handleSelection = () => {
    updateSelection(causeID);
    setSelectedCard((prevSelectedCard) => !prevSelectedCard);
  };

  return (
    <div className={`card ${selectedCard} m-2`} onClick={handleSelection}>
      <Icon icon={icon} />
      <p className="cause mt-1">{cause}</p>
    </div>
  );
};
