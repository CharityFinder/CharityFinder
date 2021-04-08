import React, { useState } from "react";
import { Star, StarFill } from "react-bootstrap-icons";

export const Favorite = () => {
  const [favorite, setFavorite] = useState("");

  const toggleFavorite = () => {
    console.log(favorite)
    setFavorite(previousFavoriteValue => !previousFavoriteValue)
  };

  return (
    <>
      {!favorite ?
        <Star size={25} type="submit" onClick={toggleFavorite} style={{
            position:"absolute",
            bottom:25,
            right:25}}
        />
        :
        <StarFill size={25} type="submit" onClick={toggleFavorite} style={{
            position:"absolute",
            bottom:25,
            right:25}}
        />
      }
    </>
  )
}