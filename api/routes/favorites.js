import { db } from "../config/firebase.js";
import { Router } from "express";
const router = Router();

// TODO: UPDATE DOCUMENTATION

/**
 * @route
 * @desc GET All Favorites
 * @return
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
      favoriteData.push({ ...doc.data(), id: doc.id });
    });
    return res.status(200).json(favoriteData); // return empty array if no posts
  } catch (e) {
    console.log("Could not get favorites. There's an error afoot...", e);
  }
});

/**
 * @route
 * @desc Add an Organization to your Favorites
 * @return
 */
router.post("/", async (req, res) => {
  try {
    const { orgName, orgId, uid } = req.body;

    const favoriteRef = db.collection("users").doc(uid).collection("favorites");

    // TODO: Find organization from charity navigator
    // TODO: Grab organizationId
    // TODO: Update API Docs

    await favoriteRef.add({
      orgName,
      orgId,
      uid,
    });
    return res.status(204).send("Added :)");
  } catch (e) {
    console.log("There's an error afoot...", e);
  }
});

/**
 * @route
 * @desc GET Favorite organization
 * @return favorite organization if exisits
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
        console.log(
          "This organization is not favorited by this user. *raises eyebrow*"
        );
      }
    }
  } catch (e) {
    console.log("Could not favorite organization.");
  }
});

// TODO: Favorite status is true or false
// Instead of update, => add/remove
/**
 * @route
 * @desc Update
 * @return
 */
// router.put("/favorites/:favoriteId", async (req, res) => {
//   try {
//     const { uid, orgName, orgId } = req.body;
//     const { favoriteId } = req.params;

//     if (postId) {
//       const favoriteRef = db
//         .collection("users")
//         .doc(uid)
//         .collection("favorites")
//         .doc(favoriteId);

//       const getFavOrg = await favoriteRef.get();

//       if (uid === getFavOrg.data().uid) {
//         await favoriteRef.update({
//           orgName,
//           orgId,
//         });
//         return res.status(204).send("Favorite Updated??");
//       } else {
//         return res
//           .status(304)
//           .send("Can't update organization's favorited status");
//       }
//     }
//   } catch (e) {
//     console.log("There's an error afoot...", e);
//   }
// });

export default router;
