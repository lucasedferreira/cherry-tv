import { db } from "@/firebase";
import {
  collection,
  // doc,
  // getDoc,
  addDoc,
  // updateDoc,
  // deleteDoc,
  // onSnapshot,
  // where,
  // getDocs,
  // query,
} from "firebase/firestore";

export const createVideo = async (video) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const videosCollection = collection(db, `users/${userId}/videos`);
  console.log(video);
  await addDoc(videosCollection, video);
};