import { db } from "../config/firebase.js";
import { Router } from "express";
const router = Router();

/**
 * @route [GET] /api/stats
 * @desc Get Most Favorited Organizations in Desc Order
 * @return List of all "stats" areas
 */
router.get("/", async (req, res) => {
  try {
    const statsRef = db.collection("stats");

    const snapshot = await statsRef
      .where("totalFavorites", ">=", 1)
      .orderBy("totalFavorites", "desc")
      .get();

    let mostFavOrgs = [];
    snapshot.forEach((doc) => {
      mostFavOrgs.push({ ...doc.data(), id: doc.id });
    });

    return res.status(200).json(mostFavOrgs);
  } catch (e) {
    console.error("Could not get stats. There's an error afoot...", e);
  }
});

export default router;
