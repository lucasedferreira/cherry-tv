import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";
import { ref, onUnmounted } from "vue";

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

const db = getFirestore(firebaseApp);
const usersCollection = collection(db, "users");

export const createUser = async (user) => {
  return await addDoc(usersCollection, user);
};

export const getUser = async (id) => {
  const userCollection = doc(db, "users", id);
  const user = await getDoc(userCollection);
  return user.exists() ? user.data() : null;
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
