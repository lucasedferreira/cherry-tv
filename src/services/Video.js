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
import { getGroup } from "@/services/Group";

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
      const video = doc.data();

      let loadedTags = [];
      if ('tags' in video) {
        for (const tagId of video.tags) {
          const tagModel = await getTag(tagId);
          loadedTags.push(tagModel);
        }
      }

      let loadedGroups = [];
      if ('groups' in video) {
        for (const groupId of video.groups) {
          const groupModel = await getGroup(groupId);
          loadedGroups.push(groupModel);
        }
      }

      parsedVideos.push({ id: doc.id, loadedTags, loadedGroups, ...video });
    }

    return parsedVideos;
  } catch (e) {
    return [];
  }
};
