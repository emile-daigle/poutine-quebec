import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs, limit, query, where} from "firebase/firestore";
import IRestaurant from "@/interfaces/IRestaurant";

export const getAllRestaurants = async () => {
  const userDoc = await getDocs(db.restaurants);
  console.log(userDoc.docs);
  let Restaurants: IRestaurant[] = [];
  userDoc.forEach((doc) => {
    Restaurants.push(doc.data());
  });
  console.log(Restaurants)
  return Restaurants
};

export const getRestaurantById = async () => {
  const docRef = doc(db.restaurants, "TEST");
  const docSnap = await getDoc(docRef);
  return docSnap
};

export const getRestaurantByName = async (name : string) => {
  const q = query(
    db.restaurants,
    where("name", "==", name),
    limit(1)
  );
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot.docs[0].data() )
  return querySnapshot.docs[0] 
};