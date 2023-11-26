import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  // updateDoc,
  // deleteDoc,
  // onSnapshot,
  where,
  getDocs,
  query,
} from "firebase/firestore";

export const getTag = async (tagId) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const tagCollection = doc(db, `users/${userId}/tags`, tagId);
  const tag = await getDoc(tagCollection);
  return tag.exists() ? tag.data() : null;
};

export const getTags = async (userId) => {
  const tagCollection = collection(db, `users/${userId}/tags`);
  const tags = await getDocs(tagCollection);
  return tags.empty
    ? []
    : tags.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

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