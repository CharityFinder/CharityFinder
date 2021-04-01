import { db } from "../config/firebase.js";
import { Router } from "express";
import axios from "axios";

const router = Router();

/**
 * @route [GET] /api/cn/organizations
 * @desc Get All Organizations [No filters]
 * @return List of all organizations, JSON object array
 */
router.get("/organizations", async (req, res) => {
  try {
    const orgSnapshot = await axios.get(
      `${process.env.CN_BASE_URL}/Organizations?app_id=${process.env.CN_APP_ID}&app_key=${process.env.CN_APP_KEY}`
    );

    console.log("It's data", orgSnapshot.data);
    return res.status(200).send(orgSnapshot.data);
  } catch (e) {
    console.error("Could not get organizations :( [CN API ERROR]", e);
  }
});

export default router;
