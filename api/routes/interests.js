import { db } from "../config/firebase.js";
import { Router } from "express";
const router = Router();

// TODO: Update documentation
// TODO: Update Error Handling

/**
 * @route [GET] /api/interests/
 * @desc Get All Interest Areas
 * @return List of all "interest" areas
 */
router.get("/", async (req, res) => {
  try {
    const { userId } = req.body;
    const interestsRef = db.collection("interests");

    const snapshot = await interestsRef.where("userId", "==", userId).get();

    let userInterests = [];
    snapshot.forEach((doc) => {
      userInterests.push({ ...doc.data(), id: doc.id });
      console.log(doc.id, "=>", doc.data());
    });

    return res.status(200).json(userInterests);
  } catch (e) {
    console.error("Could not get favorites. There's an error afoot...", e);
  }
});

// TODO: Switch to accept a list of interests, and update db selection
/**
 * @route [POST] /api/interests/
 * @desc Add an interest area to your profile
 * @return 204 good response
 */
router.post("/", async (req, res) => {
  try {
    const { causeId, causeName, userId } = req.body;
    const interestRef = db.collection("interests");

    await interestRef.add({
      causeId,
      causeName,
      userId,
    });

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
      return res.status(304).json({ causeName: null, causeId: null, id: "" });
    }
  } catch (e) {
    console.error("Could not get interest area.");
  }
});

/**
 * @route [PUT] /api/interests/
 * @desc Add an interest area to your profile
 * @return 204 good response / 304 Not Modified [check user authentication]
 */
router.put("/:interestId", async (req, res) => {
  try {
    const { causeId, causeName } = req.body;
    const { interestId } = req.params;

    const interestRef = db.collection("interests").doc(interestId);

    await interestRef.update({
      causeId,
      causeName,
    });

    return res.status(204).send(`${causeName} was updated`);
  } catch (e) {
    console.error("There's an error afoot...", e);
  }
});

/**
 * @route [DEL] /api/interests/
 * @desc Add an interest area to your profile
 * @return 204 good response / 304 Not Modified [check user authentication]
 */
router.delete("/:interestId", async (req, res) => {
  try {
    const { causeId, causeName } = req.body;
    const { interestId } = req.params;

    const interestRef = db.collection("interests").doc(interestId);

    await interestRef.delete();

    return res.status(204).send(`${causeName} was removed from your causes`);
  } catch (e) {
    console.error("There's an error afoot...", e);
  }
});

export default router;
