/* eslint-disable no-unused-vars */
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "@firebase/firestore";
// eslint-disable-next-line no-undef
const {FB_API, FB_authDomain, FB_projectId, FB_storageBucket, FB_messagingSenderId, FB_appId, FB_measurementId } = process.env
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: FB_API,
  authDomain: FB_authDomain,
  projectId: "seranvehiclesrent",
  storageBucket: FB_storageBucket,
  messagingSenderId: FB_messagingSenderId,
  appId: FB_appId,
  measurementId: FB_measurementId
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const db = getFirestore(app);