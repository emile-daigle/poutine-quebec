import IRestaurant from "@/interfaces/IRestaurant";
import { database } from "@/lib/firebase";
import {
  DatabaseReference,
  get,
  push,
  ref,
  remove,
  set,
  getDatabase,
  child,
} from "firebase/database";
import React, { useEffect, useState } from "react";

const Restaurants = () => {
  const [restaurant, setRestaurant] = useState<IRestaurant>();

  useEffect(() => {
    const dbRef = ref(database);
    const dbtest = ref(database, "/restaurants/");
    get(child(dbRef, "/restaurants?name=Ti-Gus"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          console.log(snapshot.val());
          setRestaurant(snapshot.val());
          console.log(restaurant);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const addRestaurant = () => {
    const restRef = ref(database, "/restaurants/" + "Ti-Gus");
    const restaurant = {
      reviews: [
        {
          userID: 2,
          note: 4,
          commentaire: "Très bon",
        },
        {
          userID: 4,
          note: 1,
          commentaire: "Pas bon",
        },
      ],
      pos: {
        lat: 49,
        lng: -70.5,
      },
    };
    set(restRef, restaurant);
  };
  const changeReview = () => {
    const restRef = ref(database, "/restaurants/" + "Ti-Gus/reviews");
    const review = {
      userID: 2,
      note: 4,
      commentaire: "Très bon",
    };

    push(restRef, review);
  };
  const deleteReview = () => {
    const restRef = ref(
      database,
      "/restaurants/Ti-Gus/reviews/-NMdQo3xItxZQC_CsN9r"
    );
    remove(restRef);
  };

  return (
    <>
      <button onClick={addRestaurant}>Ajouter un restaurant</button>
      <button onClick={changeReview}>Ajouter un review</button>
      <button onClick={deleteReview}>Supprimer un review</button>
      {restaurant && <p>{restaurant.name}</p>}
    </>
  );
};

export default Restaurants;
