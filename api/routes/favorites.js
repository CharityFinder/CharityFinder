import { db } from "../config/firebase.js";
import { Router } from "express";
const router = Router();

// TODO: Update documentation
// TODO: Cloud Functions to add/remove favorited items

/**
 * @route [GET] /api/favorites/
 * @desc Get All Favorites
 * @return List of all "favorited" organizations
 */
router.get("/", async (req, res) => {
  try {
    const { uid } = req.body;
    const favoritesRef = db
      .collection("users")
      .doc(uid)
      .collection("favorites");
    const favoritesSnap = await favoritesRef.get();
    console.log(favoritesSnap);

    let favoriteData = [];
    favoritesSnap.forEach((doc) => {
      favoriteData.push({ ...doc.data(), id: doc.id }); // append id for update+delete
    });
    return res.status(200).json(favoriteData);
  } catch (e) {
    console.log("Could not get favorites. There's an error afoot...", e);
  }
});

/**
 * @route [POST] /api/favorites/
 * @desc Add an Organization to your Favorites
 * @return 204 good response
 */
router.post("/", async (req, res) => {
  try {
    const { orgName, orgId, orgAddress, uid } = req.body;

    const favoriteRef = db.collection("users").doc(uid).collection("favorites");

    await favoriteRef.add({
      orgName,
      orgId,
      orgAddress,
    });
    return res.status(204).send("Favorited :)");
  } catch (e) {
    console.log("There's an error afoot...", e);
  }
});

/**
 * @route [GET] /api/favorites/:favoriteId
 * @desc GET Favorite organization
 * @return Organization object, if in user's Favorites
 */
router.get("/:favoriteId", async (req, res) => {
  try {
    const { uid } = req.body;
    const { favoriteId } = req.params;

    if (favoriteId) {
      const favoriteRef = db
        .collection("users")
        .doc(uid)
        .collection("favorites")
        .doc(favoriteId);

      const favoriteItem = await favoriteRef.get();

      if (favoriteItem.exists) {
        return res
          .status(200)
          .json({ ...favoriteItem.data(), id: favoriteItem.id });
      } else {
        return res.status(304).json({
          error:
            "This organization is not favorited by this user. *raises eyebrow*",
        });
      }
    }
  } catch (e) {
    console.log("Could not get favorited organization.");
  }
});

export default router;
