import { db } from "@/firebase";
import { collection, getDocs } from "firebase/firestore";

let series = [];
let loaded = false;

export const useLoadSeries = async (userId) => {
  if (loaded) return;

  const serieCollection = collection(db, `users/${userId}/series`);
  const snapshot = await getDocs(serieCollection);
  series = snapshot.empty
    ? []
    : snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

  loaded = true;
  return series;
};
