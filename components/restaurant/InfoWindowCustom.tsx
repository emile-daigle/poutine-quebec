import { IRestaurantInfo } from "@/interfaces/IRestaurant";
import { InfoWindowF } from "@react-google-maps/api";
import React from "react";

interface Props {
  restaurant: IRestaurantInfo;
}

const InfoWindowCustom = ({ restaurant }: Props) => {
  return <InfoWindowF>
    <h2>{restaurant.name}</h2>
    <p>{restaurant.name}</p>
  </InfoWindowF>;
};

export default InfoWindowCustom;
