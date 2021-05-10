import { db } from "../config/firebase.js";
import { Router } from "express";
const router = Router();

/**
 * @route [GET] /api/donations
 * @desc Get All Donations
 * @return List of all organizations the user donated to
 */
router.get("/", async (req, res) => {
    try {
      const { userId } = req.query;
      const donationsRef = db.collection("donations");
  
      const snapshot = await donationsRef.where("userId", "==", userId).get();

      //get user with corresponding userID
  
      let donations = [];
  
      snapshot.forEach((doc) => {
        donations.push({ ...doc.data(), id: doc.id });
      });
      return res.status(200).json(donations);
    } catch (e) {
      console.error("Could not retrieve donations.", e);
    }
  });

  /**
 * @route [POST] /api/donations
 * @desc Add an Organization to your Donations Log
 * @return 204 good response
 */
router.post("/", async (req, res) => {
    try {
      const { orgId, userId, donationAmount } = req.query;
      // query parameters we are passing
      const donationsRef = db.collection("donations");
    //   const favSnapshot = await favoritesRef
    //     .where("orgId", "==", orgId)
    //     .where("userId", "==", userId)
    //     .get();
  
      /* Add to Donations Log & Avoid Duplicates */
    //   if (donSnapshot.docs.length === 0) {
        await donationsRef.add({
          orgId,
          userId,
          donationAmount,
        });
      // }
  
      return res.status(204).send("Donations :)");
    } catch (e) {
      return res.status(304).send("Something went wrong");
    }
  });

export default router;
