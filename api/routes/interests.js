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
    const { uid } = req.body;
    const interestsRef = db
      .collection("users")
      .doc(uid)
      .collection("interests");
    const interestsSnap = await interestsRef.get();
    console.log(interestsSnap);

    let interestsData = [];
    interestsSnap.forEach((doc) => {
      interestsData.push({ ...doc.data(), id: doc.id }); // append id for update+delete
    });
    return res.status(200).json(interestsData);
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
    const { causeId, causeName, uid } = req.body;
    const favoriteRef = db.collection("users").doc(uid).collection("interests");

    await favoriteRef.add({
      causeId,
      causeName,
    });

    return res.status(204).send("Interest Areas Added :)");
  } catch (e) {
    console.error("There's an error afoot...", e);
  }
});

/**
 * CAUTION: Experimental Feature
 * @route [GET] /api/interests/:interestId
 * @desc GET Interest Area Information
 * @return Interests object, if exists
 */
router.get("/:interestId", async (req, res) => {
  try {
    const { uid } = req.body;
    const { interestId } = req.params;

    if (interestId) {
      const interestRef = db
        .collection("users")
        .doc(uid)
        .collection("interests")
        .doc(interestId);

      const interestItem = await interestRef.get();
      if (interestItem.exists) {
        return res
          .status(200)
          .json({ ...interestItem.data(), id: interestItem.id });
      } else {
        return res.status(304).json({
          error:
            "This interest area does not exist for this user. *raises eyebrow*",
        });
      }
    }
  } catch (e) {
    console.error("Could not get interest area.");
  }
});

/**
 * CAUTION: Experimental Feature, determining if anyone such power is useful
 * @route [PUT] /api/interests/
 * @desc Add an interest area to your profile
 * @return 204 good response / 304 Not Modified [check user authentication]
 */
router.put("/:interestId", async (req, res) => {
  try {
    const { causeId, causeName, uid } = req.body;
    const { interestId } = req.params;

    const interestRef = db
      .collection("users")
      .doc(uid)
      .collection("interests")
      .doc(interestId);

    await interestRef.update({
      causeId,
      causeName,
    });
    return res.status(204).send("Interest Areas Updated :)");
  } catch (e) {
    console.error("There's an error afoot...", e);
  }
});

export default router;
