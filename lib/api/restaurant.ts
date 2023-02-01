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
    const querySnapshot = await getDocs(db.restaurants);
    let restaurants: IRestaurant[] = [];
    querySnapshot.forEach((doc) => {
      restaurants.push(doc.data());
    });
    return restaurants;
  } catch (error) {
    console.error(error);
  }
};

export const getRestaurantById = async (id: string) => {
  try {
    const docRef = doc(db.restaurants, id);
    const restaurant = await getDoc(docRef);
    return restaurant;
  } catch (error) {
    console.error(error);
  }
};

export const getRestaurantByName = async (name: string) => {
  try {
    const q = query(db.restaurants, where("name", "==", name), limit(1));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs[0].data());
    return querySnapshot.docs[0];
  } catch (error) {
    console.error(error);
  }
};

export const editRestaurant = async (id: string) => {
  try {
  } catch (error) {}
};

export const deleteRestaurant = async (id: string) => {
  try {
  } catch (error) {}
};
