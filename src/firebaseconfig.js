import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZ780i0geTSaZthRUhqD1OHNvy1Qnj9uY",
  authDomain: "armsolutionfirebase-26d6c.firebaseapp.com",
  projectId: "armsolutionfirebase-26d6c",
  storageBucket: "armsolutionfirebase-26d6c.firebasestorage.app",
  messagingSenderId: "682836065484",
  appId: "1:682836065484:web:19aa658acaf5290cca9669",
  measurementId: "G-2WPM8JPP17"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const analytics = getAnalytics(app);