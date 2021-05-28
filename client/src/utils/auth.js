import { createContext } from "react";
import { auth, db } from "../config/firebase";
import "firebase/firestore";

/* User Context Object */
export const UserContext = createContext({
  user: null,
  userData: {},
  interests: [],
  updateUserData: () => {},
  updateInterests: () => {},
});

/**
 * @desc Register user
 * @return User Object
 * @param {*} user
 */
export const registerUser = async (userData) => {
  return auth
    .createUserWithEmailAndPassword(userData.email, userData.password)
    .then(({ user }) => {
      const { password, ...newUserInfo } = userData; // do not directly store passwords

      db.collection("users").doc(user.uid).set(newUserInfo); // TODO: Move to backend endpoint and link with service function
      return { user: user };
    })
    .catch((err) => {
      return { error: err };
    });
};

/**
 * @desc Login User
 * @return  User Object
 * @param {*} user
 */
export const loginUser = async ({ email, password }) => {
  return auth
    .signInWithEmailAndPassword(email, password)
    .then(({ user }) => {
      return { user: user };
    })
    .catch((err) => {
      return { error: err };
    });
};

/**
 * @desc Logout User
 * @return Error || Nothing
 * @param {*} user
 */
export const logoutUser = async () => {
  return auth.signOut().catch((err) => {
    return err;
  });
};

// TODO: Move to backend endpoint and link with service function
export const getUser = async (uid) => {
  const userRef = db.collection("users").doc(uid);
  try {
    const doc = await userRef.get();
    if (doc.exists) {
      return doc.data();
    } else {
      console.log(
        "Error. This user breaches the plane of existence. User DNE."
      );
    }
  } catch (error) {
    console.log("error getting document in getUser");
  }
};
