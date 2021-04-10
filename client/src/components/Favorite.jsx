import React, { useState, useContext } from "react";
import { UserContext } from "../utils/auth";
import { Star, StarFill } from "react-bootstrap-icons";
import axios from "axios";

export const Favorite = ({name, ein, isFavorited}) => {
  // isFavorited is either false or the favoriteId
  const { user } = useContext(UserContext);
  const [favorite, setFavorite] = useState(isFavorited);

  const toggleFavorite = () => {
    setFavorite(previousFavoriteValue => !previousFavoriteValue);
    if (favorite) { //already favorited, delete from favorites
      removeFavorite();
    }
    else {
      addFavorite();
    }

  };

  const addFavorite = async () => {
    await axios.post('/api/favorites', null, {
      params: {
        orgName: name,
        orgId: ein, 
        userId: user.uid,
        orgAddress: "not really an address"
      }
    })
  }

  const removeFavorite = async () => {
    console.log("trying to remove");
    await axios.delete('/api/favorites/' + isFavorited, {
      params: {
        orgName: name
      }
    })
  }

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