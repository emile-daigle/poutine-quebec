import { IRestaurantInfo } from "@/interfaces/IRestaurant";
import { InfoWindowF } from "@react-google-maps/api";
import StarRating from "./StarRating";
import React from "react";
import Link from "next/link";

interface Props {
  restaurant: IRestaurantInfo;
}

const InfoWindowCustom = ({ restaurant }: Props) => {
  return (
    <InfoWindowF position={restaurant.pos} options={{minWidth: 300}}>
      <div className="info-window">
        <h2>{restaurant.name}</h2>
        <p>
          {restaurant.address} Ceci est un restaurant avec une addresse lognue
          lol
        </p>
        <div className="info-window__bottom">
          <StarRating rating={2} />
          <Link href={`/restaurants/${restaurant.uid}`}>Détails</Link>
        </div>
      </div>
    </InfoWindowF>
  );
};

export default InfoWindowCustom;
