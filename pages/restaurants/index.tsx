import RestaurantList from "@/components/restaurant/RestaurantList";
import IRestaurant from "@/interfaces/IRestaurant";
import { getAllRestaurants } from "@/lib/api/restaurant";
import { database } from "@/lib/firebase";
import { FaChevronRight } from "react-icons/fa";
import { set } from "firebase/database";
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
import StarRating from "@/components/restaurant/StarRating";

const Restaurants = () => {
  const restaurantCollection = collection(database, "Restaurants");
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [data, setData] = useState<string>("");
  const [recherche, setRecherche] = useState<string>("");

  useEffect(() => {
    getAllRestaurants().then((result) => {
      setRestaurants(result || []);
    });
  }, []);

  const addRestaurant = async () => {
    const docRef = await addDoc(restaurantCollection, {
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
      name: "Ti-Gus",
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const getRestaurants = async () => {
    setData("");
    const querySnapshot = await getDocs(collection(database, `Restaurants`));
    querySnapshot.forEach((doc) => {
      console.log(data);
      setData((data) => {
        return data + `${doc.id} => ${JSON.stringify(doc.data())} \n`;
      });
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  };

  const getRestaurant = async () => {
    const docRef = doc(database, "Restaurants", "ducDJE5bCm8NJ4O2HCnz");
    const docSnap = await getDoc(docRef);
    setData((data) => {
      return `${docSnap.id} => ${JSON.stringify(docSnap.data())} \n`;
    });
  };

  const getFilteredRestaurants = async () => {
    setData("");
    const citiesRef = collection(database, "Restaurants");
    const q = query(citiesRef, where("region", "==", "Gaspésie"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(data);
      setData((data) => {
        return data + `${doc.id} => ${JSON.stringify(doc.data())} \n`;
      });
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  };

  const getOneRestaurantByName = async () => {
    setData("");
    //const q = query(collection(database, "users"), orderBy('metrics/views'), where("age", ">", "25"), where("location", "==", "chicago"), limit(1));
    const q = query(
      restaurantCollection,
      where("region", "==", "Gaspésie"),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(data);
      setData((data) => {
        return data + `${doc.id} => ${JSON.stringify(doc.data())} \n`;
      });
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  };

  const deleteRestaurant = async () => {
    //const q = query(collection(database, "users"), orderBy('metrics/views'), where("age", ">", "25"), where("location", "==", "chicago"), limit(1));
    await deleteDoc(doc(restaurantCollection, "d1kGGz5LVG4GFv6xl3vX"));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    console.log("Submit");
    event.preventDefault();
    setData("");
    //const q = query(collection(database, "users"), orderBy('metrics/views'), where("age", ">", "25"), where("location", "==", "chicago"), limit(1));
    const q = query(
      restaurantCollection,
      where("name", "==", `${recherche}`),
      limit(1)
    );
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot.docs);
    querySnapshot.forEach((doc) => {
      console.log(data);
      setData((data) => {
        return data + `${doc.id} => ${JSON.stringify(doc.data())} \n`;
      });
      console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
    });
  };
  return (
    <div>
      <div>
        <button onClick={addRestaurant}>Ajouter un restaurant</button>
        <button onClick={getRestaurants}>Get all restaurants</button>
        <button onClick={getRestaurant}>Get one restaurant</button>
        <button onClick={getFilteredRestaurants}>
          Get filtered restaurants
        </button>
        <button onClick={getOneRestaurantByName}>
          Get one restaurant by name
        </button>
        <button onClick={deleteRestaurant}>Supprimer Restaurant</button>
        <div>
          <form onSubmit={(event) => handleSubmit(event)}>
            <input
              type="text"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              placeholder="Nom"
            />
            <button type="submit">Rechercher</button>
          </form>
        </div>
      </div>
      <div className="restaurants-container">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="restaurant-item">
            <div>
              <div className="restaurant-name-star">
                <h4>{restaurant.name}</h4>
                {/* Il reste à aller chercher le rating de chaque restaurant */}
                <StarRating rating={2} />
              </div>
              <p>{restaurant.address}</p>
            </div>
            <FaChevronRight className="chevron-right" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Restaurants;
