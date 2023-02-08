import { db } from "@/lib/firebase";
import { doc, getDoc, getDocs, limit, query, where} from "firebase/firestore";
import IUser from "@/interfaces/IUser";

export const getAllUsers = async () => {
  const userDoc = await getDocs(db.users);
  console.log(userDoc.docs);
  let Restaurants: IUser[] = [];
  userDoc.forEach((doc) => {
    Restaurants.push(doc.data());
  });
  console.log(Restaurants)
  return Restaurants
};

export const getUserById = async (id : string) => {
  const docRef = doc(db.users, id);
  const docSnap = await getDoc(docRef);
  return docSnap
};