import axios from "axios";

/**
 * Add list of interests to database
 * @param {*} interests list of interest objects
 */
export const addInterest = async (userId, interests) => {
  console.log(userId, interests);
  for (let i = 0; i < interests.length; i++) {
    await axios.post("/api/interests", null, {
      params: {
        userId: userId,
        causeId: interests[i],
      },
    });
  }
};
