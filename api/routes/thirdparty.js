import { Router } from "express";
import { db } from "../config/firebase.js";
import axios from "axios";

const router = Router();

const BASE_URL = process.env.CN_BASE_URL;
const CREDENTIALS = `?app_id=${process.env.CN_APP_ID}&app_key=${process.env.CN_APP_KEY}`;

// TODO: Determine the appropriate `pageSize` and `pageNum` for organization response

/**
 * @route [GET] /api/cn/organizations
 * @desc Get All Organizations [No filters]
 * @return List of all organizations, JSON object array
 */
router.get("/organizations", async (req, res) => {
  try {
    /*
      search => string: filter by search term
      searchType => "DEFAULT" or "NAME_ONLY": filter by organization name 
      rated => boolean: show only rated organizations in results*
      state => char(2): filter by state code
      city => string: filter by city name
      zip => number xxxxx or xxxxx-xxxx: filter by zipcode
      donorPrivacy => boolean: TRUE filters for organizations with donor privacy policy
      scopeOfWork => "REGIONAL", "NATIONAL", "INTERNATIONAL", "ALL": scope of organization
      cfcCharities => boolean: filter for Combined Federal Campaign organizations
    */
    const {
      search,
      searchType,
      rated,
      state,
      city,
      zip,
      donorPrivacy,
      scopeOfWork,
      cfcCharities,
    } = req.query;

    let orgs = `${BASE_URL}/Organizations${CREDENTIALS}`;

    orgs = search ? orgs.concat(`&search=${search}`) : orgs;
    orgs =
      search && searchType ? orgs.concat(`&searchType=${searchType}`) : orgs;
    orgs = rated ? orgs.concat(`&rated=${rated}`) : orgs;
    orgs = state ? orgs.concat(`&state=${state}`) : orgs;
    orgs = city ? orgs.concat(`&city=${city}`) : orgs;
    orgs = zip ? orgs.concat(`&zip=${zip}`) : orgs;
    orgs = donorPrivacy ? orgs.concat(`&donorPrivacy=${donorPrivacy}`) : orgs;
    orgs = scopeOfWork ? orgs.concat(`&scopeOfWork=${scopeOfWork}`) : orgs;
    orgs = cfcCharities ? orgs.concat(`&cfcCharities=${cfcCharities}`) : orgs;

    const orgSnapshot = await axios.get(orgs);

    return res.status(200).json(orgSnapshot.data);
  } catch (e) {
    // console.error("No organizations meet the requirements");
    return res.status(200).json([]);
  }
});

/**
 * @route [GET] /api/cn/organizations/:ein
 * @desc Get Organizations with Identification Number ein
 * @return Organization JSON object
 */
router.get("/organizations/:ein", async (req, res) => {
  try {
    const { ein } = req.params;

    const orgSnapshot = await axios.get(
      `${BASE_URL}/Organizations/${ein}${CREDENTIALS}`
    );

    return res.status(200).json(orgSnapshot.data);
  } catch (e) {
    // console.error("No organizations meet the requirements");
    return res.status(200).json([]);
  }
});

/**
 * @route [GET] /api/cn/organizations
 * @desc Get All Organizations [No filters]
 * @return List of all organizations, JSON object array
 */
router.get("/organizations/:ein/advisories", async (req, res) => {
  try {
    const { ein } = req.params;

    const orgSnapshot = await axios.get(
      `${BASE_URL}/Organizations/${ein}/advisories${CREDENTIALS}`
    );

    return res.status(200).json(orgSnapshot.data);
  } catch (e) {
    // console.error("No organizations meet the requirements");
    return res.status(200).json([]);
  }
});

/**
 * @route [GET] /api/cn/suggestions
 * @desc GET Interest Area Information
 * @return Interests object, if exists
 */
router.get("/suggestions", async (req, res) => {
  try {
    const { userId } = req.query;

    /* Grab Interests */
    const interestsRef = db.collection("interests");
    const snapshot = await interestsRef.where("userId", "==", userId).get();
    let userInterests = [];

    snapshot.forEach((doc) => {
      userInterests.push({
        causeId: doc.data().causeId,
        causeName: doc.data().causeName,
      });
    });

    // const pageNum = Math.floor(Math.random() * 2);
    const pageSize = 3;
    const suggestions = [];

    for (let i = 0; i < userInterests.length; i++) {
      const causeID = userInterests[i].causeId;

      let orgs = `${BASE_URL}/Organizations${CREDENTIALS}&causeID=${causeID}&rated=true&pageSize=${pageSize}`;

      const orgSnapshot = await axios.get(orgs);
      suggestions.push(...orgSnapshot.data);
    }
    return res.status(200).json(suggestions);

    /* TODO: REMOVE DUPLICATE SUGGESTIONS */
  } catch (e) {
    console.error("No organizations meet these requirements");
    return res.status(200).json([]);
  }
});

export default router;
