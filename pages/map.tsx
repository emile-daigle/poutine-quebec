import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  InfoWindow,
  InfoWindowF,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { database } from "@/lib/firebase";
import { onValue, push, ref } from "firebase/database";
import { IPos } from "@/interfaces/IPos";
import IRestaurant from "@/interfaces/IRestaurant";
import { collection, getDocs } from "firebase/firestore";
import InfoWindowCustom from "@/components/restaurant/InfoWindowCustom";
import { getAllRestaurants } from "@/lib/api/restaurant";
import getDistanceOneToOne from "@/lib/google/distance";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const OPTIONS = {
  minZoom: 3,
};
interface IPosition {
  lat: number;
  lng: number;
}
const Map = () => {
  const [activeMarker, setActiveMarker] = useState<number | null>(null);
  const [restaurants, setRestaurants] = useState<IRestaurant[]>();
  const [closestRestaurant, setClosestRestaurant] = useState<number | null>(
    null
  );
  const [pos, setPos] = useState<IPosition>({
    lat: 0,
    lng: 0,
  });
  const [zoom, setZoom] = useState(7);
  const [center, setCenter] = useState<IPosition>({
    lat: 47,
    lng: -70.5,
  });
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "",
  });

  const [title, setTitle] = useState("");

  const handleActiveMarker = (marker: number) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  useEffect(() => {
    const fetchRestaurants = async () => {
      setRestaurants(await getAllRestaurants());
    };
    fetchRestaurants();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position: GeolocationPosition) => {
          setPos({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          console.log(position.coords);
        }
      );
    } else {
      alert("La localisation n'est pas supportée dans votre navigateur! ");
    }
  }, []);

  useEffect(() => {
    if (!restaurants) return;
    let closestDistance: number = Number.MAX_SAFE_INTEGER;
    let closestID: number;
    restaurants.map((restaurant, id) => {
      if (getDistanceOneToOne(pos, restaurant.pos) < closestDistance) {
      }
    });
  }, [pos]);

  return isLoaded ? (
    <>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        clickableIcons={false}
        zoom={zoom}
        options={OPTIONS}
      >
        {restaurants?.map((r, pid) => (
          <MarkerF position={r.pos} onClick={() => handleActiveMarker(pid)}>
            {activeMarker === pid ? <InfoWindowCustom restaurant={r} /> : null}
          </MarkerF>
        ))}
        <MarkerF
          position={pos}
          icon={{
            url: "Marker/marker-icon.png",
            scaledSize: new window.google.maps.Size(40, 64),
          }}
        />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default Map;
