
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOFeDy2RQYGuXRDByw1Sw1z3RKss_65ko",
  authDomain: "dragonballapp-6b49f.firebaseapp.com",
  projectId: "dragonballapp-6b49f",
  storageBucket: "dragonballapp-6b49f.firebasestorage.app",
  messagingSenderId: "886055501853",
  appId: "1:886055501853:web:651a65869eeb073ac446f4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
