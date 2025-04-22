import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB463dF-Fgv3Q4OnJS_N_Sf4cEVkvCbN18",
  authDomain: "driving-school-7133a.firebaseapp.com",
  projectId: "driving-school-7133a",
  storageBucket: "driving-school-7133a.firebasestorage.app",
  messagingSenderId: "883356433850",
  appId: "1:883356433850:web:592de3b45cc8e0d373f183",
  measurementId: "G-CQYSB71ZTS"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);
export const auth = getAuth(app);