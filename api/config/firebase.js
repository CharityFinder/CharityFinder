import dotenv from "dotenv";
dotenv.config();

import admin from "firebase-admin";

// Initialize on GCP
admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: process.env.NODE_APP_DB_URL,
});

console.log(process.env.NODE_APP_DB_URL);

export const db = admin.firestore();
export const FieldValue = admin.firestore.FieldValue;
export const FieldPath = admin.firestore.FieldPath;
