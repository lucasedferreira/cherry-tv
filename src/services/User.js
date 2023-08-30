import { db } from "@/firebase";
import {
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  where,
  getDocs,
  query,
} from "firebase/firestore";
import { ref, onUnmounted } from "vue";

const usersCollection = collection(db, "users");

export let User = {};
if (localStorage.getItem("user"))
  User = JSON.parse(localStorage.getItem("user"));

export const setUser = async (user) => {
  localStorage.setItem("user", JSON.stringify(user));
  User = user;
};

export const createUser = async (user) => {
  const newUser = await addDoc(usersCollection, user);
  setUser(newUser);
  return newUser;
};

export const getUser = async (id) => {
  const userCollection = doc(db, "users", id);
  const user = await getDoc(userCollection);
  return user.exists() ? user.data() : null;
};

export const getUserByEmail = async (userEmail) => {
  const q = query(usersCollection, where("email", "==", userEmail));
  const users = await getDocs(q);
  return users.empty ? null : { id: users.docs[0].id, ...users.docs[0].data() };
};

export const updateUser = async (id, user) => {
  const userCollection = doc(db, "users", id);
  return await updateDoc(userCollection, user);
};

export const deleteUser = async (id) => {
  const userCollection = doc(db, "users", id);
  return await deleteDoc(userCollection);
};

export const useLoadUsers = () => {
  const users = ref([]);

  onSnapshot(usersCollection, (snapshot) => {
    users.value = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  });

  onUnmounted(close);
  return users;
};
