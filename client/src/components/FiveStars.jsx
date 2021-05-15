import React from "react";
import { Star, StarFill } from "react-bootstrap-icons";

export const FiveStars = ({ rating = 3, color }) => {
  const Filled = () => {
    let stars = [];

    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        stars.push(
          <StarFill
            size={15}
            style={{
              color: `${color}`,
            }}
          />
        );
      } else {
        stars.push(<Star size={15} />);
      }
    }
    return stars;
  };

  return (
    <div className="five-star flex">
      <Filled />
    </div>
  );
};
