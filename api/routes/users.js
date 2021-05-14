import { db } from "../config/firebase.js";
import { Router } from "express";
const router = Router();


/**
 * @route [PUT] /api/users
 * @desc Update Users' information in the profile page
 * @return 204 good response / 304 Not Modified [check user authentication]
 */
router.put("/:userId", async (req, res) => {
  try {
    //const { firstName, lastName, city, state, zipcode } = req.query;
    const { userBody } = req.query;
    const { userId } = req.params;

    const userRef = db.collection("users").doc(userId);

    await userRef.update({
      // firstName,
      // lastName,
      // city,
      // state,
      // zipcode,
      ...userBody
    });

    return res.status(204).send(`Information was updated`);
  } catch (e) {
    console.error("There's an error afoot...", e);
  }
});


export default router;
