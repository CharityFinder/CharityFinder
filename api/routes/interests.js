import { db } from "../config/firebase.js";
import { Router } from "express";
const router = Router();

// TODO: Update documentation
// TODO: Update Error Handling

/**
 * @route [GET] /api/interests
 * @desc Get All Interest Areas
 * @return List of all "interest" areas
 */
router.get("/", async (req, res) => {
  try {
    const { userId } = req.query;
    const interestsRef = db.collection("interests");

    const snapshot = await interestsRef.where("userId", "==", userId).get();

    let userInterests = [];
    snapshot.forEach((doc) => {
      userInterests.push({ ...doc.data(), id: doc.id });
    });

    return res.status(200).json(userInterests);
  } catch (e) {
    console.error("Could not get user interests. There's an error afoot...", e);
  }
});

// TODO: Switch to accept a list of interests, and update db selection
/**
 * @route [POST] /api/interests
 * @desc Add an interest area to your profile
 * @return 204 good response
 */
router.post("/", async (req, res) => {
  try {
    const { causeId, userId } = req.query;
    const interestRef = db.collection("interests");

    const snapshot = await interestRef
      .where("causeId", "==", causeId)
      .where("userId", "==", userId)
      .get(); // does not favorite the same organization more than once for each user

    if (snapshot._size === 0) {
      await interestRef.add({
        causeId,
        userId,
      });
    }

    return res.status(204).send("Interest Areas Added :)");
  } catch (e) {
    console.error("There's an error afoot...", e);
  }
});

/**
 * @route [GET] /api/interests/:interestId
 * @desc GET Interest Area Information
 * @return Interests object, if exists
 */
router.get("/:interestId", async (req, res) => {
  try {
    const { interestId } = req.params;

    const interestRef = db.collection("interests").doc(interestId);

    const interestItem = await interestRef.get();
    if (interestItem.exists) {
      return res
        .status(200)
        .json({ ...interestItem.data(), id: interestItem.id });
    } else {
      return res
        .status(304)
        .json({ error: "This interest area does not exist...*thinking*" });
    }
  } catch (e) {
    console.error("Could not get interest area.");
  }
});

/**
 * EXPERIMENTAL
 * @route [PUT] /api/interests
 * @desc Update interest area in your profile
 * @return 204 good response / 304 Not Modified [check user authentication]
 */
router.put("/:interestId", async (req, res) => {
  try {
    const { causeId } = req.query;
    const { interestId } = req.params;

    const interestRef = db.collection("interests").doc(interestId);

    await interestRef.update({
      causeId,
    });

    return res.status(204).send(`It was updated`);
  } catch (e) {
    console.error("There's an error afoot...", e);
  }
});

/**
 * @route [DEL] /api/interests
 * @desc Remove interest area from your profile
 * @return 204 good response
 */
router.delete("/:interestId", async (req, res) => {
  try {
    const { causeId } = req.query;
    const { interestId } = req.params;

    const interestRef = db.collection("interests").doc(interestId);

    await interestRef.delete();

    return res.status(204).send(`${causeId} was removed from your causes`);
  } catch (e) {
    console.error("There's an error afoot...", e);
  }
});

export default router;
