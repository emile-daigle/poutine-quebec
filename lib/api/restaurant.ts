import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import IRestaurant from "@/interfaces/IRestaurant";

export const getAllRestaurants = async () => {
  const userDoc = await getDocs(db.restaurants);
  console.log(userDoc.docs);
  let Restaurants: IRestaurant[] = [];
  userDoc.forEach((doc) => {
    Restaurants.push({ ...doc.data(), uid: doc.id });
  });
  console.log(Restaurants);
  return Restaurants;
};

export const getRestaurantById = async () => {
  const docRef = doc(db.restaurants, "TEST");
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return undefined;
  const restaurant: IRestaurant = { ...docSnap.data(), uid: docSnap.id };
  return restaurant;
};

export const getRestaurantByName = async (name: string) => {
  const q = query(db.restaurants, where("name", "==", name), limit(1));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return undefined;
  return querySnapshot.docs[0];
};
