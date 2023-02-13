import { db } from "@/lib/firebase";
import {
  doc,
  getDoc,
  getDocs,
  limit,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import IRestaurant from "@/interfaces/IRestaurant";

export const addRestaurant = async () => {
  // restaurant info needed
  // try {
  //   const restaurantRef = await(db.restaurants, // id)
  //   await setDoc(restaurantRef)
  // } catch (error) {
  // }
};

export const getAllRestaurants = async () => {
  try {
    const userDoc = await getDocs(db.restaurants);
    console.log(userDoc.docs);
    let Restaurants: IRestaurant[] = [];
    userDoc.forEach((doc) => {
      Restaurants.push({ ...doc.data(), uid: doc.id });
    });
    console.log(Restaurants);
    return Restaurants;
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantById = async (id: string) => {
  try {
    const docRef = doc(db.restaurants, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return undefined;
    const restaurant: IRestaurant = { ...docSnap.data(), uid: docSnap.id };
    return restaurant;
  } catch (error) {
    console.log(error);
  }
};

export const getRestaurantByName = async (name: string) => {
  try {
    const q = query(db.restaurants, where("name", "==", name), limit(1));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) return undefined;
    return querySnapshot.docs[0].data();
  } catch (error) {
    console.log(error);
  }
};
