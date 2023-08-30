import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyASxKOHUaPkzTAr_FS3A_0Bccb2_ekoGuc",
  authDomain: "cherry-tv-49ee4.firebaseapp.com",
  projectId: "cherry-tv-49ee4",
  storageBucket: "cherry-tv-49ee4.appspot.com",
  messagingSenderId: "192687650014",
  appId: "1:192687650014:web:fa964fea58b0583209be4f",
  measurementId: "G-TXHH7Y5GSH",
};

const firebaseApp = initializeApp(config);
export const db = getFirestore(firebaseApp);
