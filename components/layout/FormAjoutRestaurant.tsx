import IRestaurant from "@/interfaces/IRestaurant";
import { database } from "@/lib/firebase";
import {
  DatabaseReference,
  get,
  push,
  ref,
  remove,
  set,
  child,
} from "firebase/database";
import {
  collection,
  addDoc,
  updateDoc,
  getDocs,
  getDoc,
  doc,
  query,
  where,
  orderBy,
  limit,
  deleteDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";

function FormAjoutRestaurant() {
  const restaurantCollection = collection(database, "Restaurants");
  const [restaurant, setRestaurant] = useState<IRestaurant>();
  const [data, setData] = useState<string>("");
  const [recherche, setRecherche] = useState<string>("");
  const [nomRestaurant, setNomRestaurant] = useState("")
  const [regionRestaurant, setregionRestaurant] = useState("")
  const [latitudeRestaurant, setLatitudeRestaurant] = useState(0)
  const [longitudeRestaurant, setlongitudeRestaurant] = useState(0)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit");
    event.preventDefault();
    setData("");
    //const q = query(collection(database, "users"), orderBy('metrics/views'), where("age", ">", "25"), where("location", "==", "chicago"), limit(1));
    const docRef = await addDoc(restaurantCollection, {
      pos: {
        lat: latitudeRestaurant,
        lng: longitudeRestaurant,
      },
      name: nomRestaurant,
      region: regionRestaurant,
    });
    console.log("Document written with ID: ", docRef.id);
  };
  return (
  <form onSubmit={(event) => handleSubmit(event)}>
  <input name="Nom" placeholder="Nom du restaurant" onChange={e => setNomRestaurant(e.target.value)}></input>
  <input name="Région" placeholder="Région du restaurant" onChange={e => setregionRestaurant(e.target.value)}></input>
  <input name="Latitude" placeholder="Latitude" onChange={e => setLatitudeRestaurant(Number(e.target.value))}></input>
  <input name="longitude" placeholder="longitude" onChange={e => setlongitudeRestaurant(Number(e.target.value))}></input>
  <button type="submit">Envoyer le formulaire</button>
  </form>
)
}

export default FormAjoutRestaurant;
