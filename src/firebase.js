import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDRF_QkLPrcs5fwe3M4Xj8aL3qCRXEd9KI",
  authDomain: "anime-tracker-2025.firebaseapp.com",
  projectId: "anime-tracker-2025",
  appId: "1:513972800482:web:68daa6e8f246ed4b9887bb",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);