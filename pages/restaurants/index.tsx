import { database } from "@/lib/firebase";
import { DatabaseReference, push, ref, set } from "firebase/database";
import React, { useState } from "react";

const Restaurants = () => {
  const [hello, setHello] = useState({ name: "allo" });

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

  return (
    <>
      <button onClick={addRestaurant}>Ajouter un restaurant</button>
      <button onClick={changeReview}>Ajouter un review</button>
    </>
  );
};

export default Restaurants;
