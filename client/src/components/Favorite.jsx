import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../utils/auth";
import { Star, StarFill } from "react-bootstrap-icons";
import axios from "axios";

export const Favorite = ({ name, ein, isFavorited, organization }) => {
  // isFavorited is either false or the favoriteId
  const { user } = useContext(UserContext);
  const [favorite, setFavorite] = useState(null);

  useEffect(() => {
    // code to run on component mount
    setFavorite(isFavorited);
  }, [isFavorited]);

  const toggleFavorite = () => {
    setFavorite((previousFavoriteValue) => !previousFavoriteValue);
    if (favorite) {
      //already favorited, delete from favorites
      removeFavorite();
    } else {
      addFavorite();
    }
  };

  const addFavorite = async () => {
    if (ein && user.uid) {
      await axios.post("/favorites", null, {
        params: {
          orgName: name || "",
          orgId: ein,
          userId: user.uid,
          orgAddress: organization.orgAddress || "",
          tagLine: organization.tagLine || "",
        },
      });
    }
  };

  const removeFavorite = async () => {
    await axios.delete("/favorites/" + isFavorited, {
      params: {
        orgId: ein,
      },
    });
  };

  return (
    <>
      {!favorite ? (
        <Star
          size={25}
          type="submit"
          onClick={toggleFavorite}
          style={{
            position: "absolute",
            bottom: 25,
            right: 25,
          }}
        />
      ) : (
        <StarFill
          size={25}
          type="submit"
          onClick={toggleFavorite}
          style={{
            position: "absolute",
            bottom: 25,
            right: 25,
            color: "rgb(249 233 151)",
          }}
        />
      )}
    </>
  );
};
