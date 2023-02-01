import { database } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import IRestaurant from "@/interfaces/IRestaurant";

export const getAllRestaurants = async () => {
  const querySnapshot = await getDocs(collection(database, `Restaurants`));
  let Restaurants: IRestaurant[] = [];
  querySnapshot.forEach((doc) => {
    Restaurants.push(doc.data() as IRestaurant);
    console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
  });
  console.log(Restaurants);
};
