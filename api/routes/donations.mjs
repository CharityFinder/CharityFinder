import { db } from "../config/firebase.mjs";
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

    if (snapshot.size > 0) {
      snapshot.forEach((doc) => {
        donations.push({ ...doc.data(), id: doc.id });
      });
    }

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
    const { orgName, userId, donationAmount } = req.query;
    const donationsRef = db.collection("donations");

    await donationsRef.add({
      orgName,
      userId,
      donationAmount,
    });

    return res.status(204).send("Donations :");
  } catch (e) {
    return res.status(304).send("Something went wrong");
  }
});

/**
 * @route [DEL] /api/donations
 * @desc Remove donation from Donations Page
 * @return 204 good response
 */
router.delete("/:donationId", async (req, res) => {
  try {
    //const { userId, orgName, donationAmount } = req.params;
    const { donationId } = req.params;

    const donationsRef = db.collection("donations").doc(donationId);
    await donationsRef
      //   .where("userId", "==", userId)
      //   .where("orgName", "==", orgName)
      //   .where("donationAmount", "==", donationAmount)
      .delete();

    return res.status(204).send(` was removed from your donations log`);
  } catch (e) {
    console.error("There's an error afoot...", e);
  }
});

export default router;
