import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const config = {
  apiKey: "AIzaSyCHMGnDh2A-_dXFGZfNFwV5gLnV9Sm46MA",
  authDomain: "choerry-tv.firebaseapp.com",
  projectId: "choerry-tv",
  storageBucket: "choerry-tv.appspot.com",
  messagingSenderId: "820876449359",
  appId: "1:820876449359:web:1d656c772d93a43f68bc3a",
  measurementId: "G-7MSDSD54MD"
};

const firebaseApp = initializeApp(config);
export const db = getFirestore(firebaseApp);
