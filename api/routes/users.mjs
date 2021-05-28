import { db } from "../config/firebase.mjs";
import { Router } from "express";
const router = Router();

/**
 * @route [PUT] /users
 * @desc Update Users' information in the profile page
 * @return 204 good response / 304 Not Modified [check user authentication]
 */
router.put("/:userId", async (req, res) => {
  try {
    const { userBody } = req.query;
    const { userId } = req.params;
    let newUserBody = JSON.parse(userBody);

    const userRef = db.collection("users").doc(userId);
    await userRef.update({
      ...newUserBody,
    });

    return res.status(204).send(`Information was updated`);
  } catch (e) {
    console.error("There's an error afoot...", e);
  }
});

export default router;
