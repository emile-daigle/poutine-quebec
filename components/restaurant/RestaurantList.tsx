import React from "react";
import getAllRestaurants from "@/lib/api/restaurant";

const RestaurantList = () => {
  const restaurants = getAllRestaurants();

  console.log("Les restaurants sont : " + restaurants);

  return <>{}</>;
};

export default RestaurantList;
