import { db } from "@/firebase";
import {
  collection,
  // doc,
  // getDoc,
  addDoc,
  // updateDoc,
  // deleteDoc,
  // onSnapshot,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { getTag } from "@/services/Tag";

export const createVideo = async (video) => {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const videosCollection = collection(db, `users/${userId}/videos`);
  await addDoc(videosCollection, video);
};

export const getVideosByTag = async (tagId) => {
  const userId = JSON.parse(localStorage.getItem("user")).id;
  const videosCollection = collection(db, `users/${userId}/videos`);
  try {
    const q = query(videosCollection, where("tags", "array-contains", tagId));
    const videos = await getDocs(q);

    if (videos.empty) return [];

    let parsedVideos = [];
    for (const doc of videos.docs) {
      let loadedTags = [];
      for (const tagId of doc.data().tags) {
        const tagModel = await getTag(tagId);
        loadedTags.push(tagModel);
      }

      parsedVideos.push({ id: doc.id, loadedTags, ...doc.data() });
    }

    return parsedVideos;
  } catch (e) {
    return [];
  }
};
