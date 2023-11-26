import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  where,
  getDocs,
  query,
} from "firebase/firestore";

export const getGroup = async (groupId) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const groupCollection = doc(db, `users/${userId}/groups`, groupId);
  const group = await getDoc(groupCollection);
  return group.exists() ? group.data() : null;
};

export const getGroups = async (userId) => {
  const groupCollection = collection(db, `users/${userId}/groups`);
  const groups = await getDocs(groupCollection);
  return groups.empty
    ? []
    : groups.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

export const getGroupByName = async (name) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const groupsCollection = collection(db, `users/${userId}/groups`);
  try {
    const q = query(groupsCollection, where("name", "==", name));
    const groups = await getDocs(q);
    return groups.empty ? null : {id: groups.docs[0].id, ...groups.docs[0].data()};
  }catch (e) {
    return null;
  }
};

export const createGroup = async (group) => {
  const userId = JSON.parse(localStorage.getItem('user')).id;
  const groupsCollection = collection(db, `users/${userId}/groups`);
  await addDoc(groupsCollection, group);
  return await getGroupByName(group.name);
};