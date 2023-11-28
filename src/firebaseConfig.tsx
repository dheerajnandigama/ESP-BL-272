// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCf8sMXiRQNbDJ9cyGf_7FqdEQkLpPGDyE",
  authDomain: "guardian-b2282.firebaseapp.com",
  projectId: "guardian-b2282",
  storageBucket: "guardian-b2282.appspot.com",
  messagingSenderId: "869212715133",
  appId: "1:869212715133:web:0aa2b1d10c413de7449914"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const database = getFirestore(app);
