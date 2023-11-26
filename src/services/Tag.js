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

export const getTagByName = async (name) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const tagsCollection = collection(db, `users/${userId}/tags`);
  try {
    const q = query(tagsCollection, where("name", "==", name));
    const tags = await getDocs(q);
    return tags.empty ? null : {id: tags.docs[0].id, ...tags.docs[0].data()};
  }catch (e) {
    return null;
  }
};

export const createTag = async (tag) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const tagsCollection = collection(db, `users/${userId}/tags`);
  await addDoc(tagsCollection, tag);
  return await getTagByName(tag.name);
};