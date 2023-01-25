import React, { useEffect, useState } from "react";
import {
  GoogleMap,
  Marker,
  MarkerF,
  useLoadScript,
} from "@react-google-maps/api";
import { database } from "@/lib/firebase";
import { onValue, push, ref } from "firebase/database";
import { IPos } from "@/interfaces/IPos";

const containerStyle = {
  width: "100%",
  height: "90vh",
};

const OPTIONS = {
  minZoom: 7,
};
interface IPosition {
  lat: number;
  lng: number;
}
const Map = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const addPos = () => {
    const posRef = ref(database, "/restaurants/position");
    const pos = {
      lat: center.lat,
      lng: center.lng,
    };
    push(posRef, pos);
  };

  useEffect(() => {
    const todoRef = ref(database, "/todos");

    onValue(todoRef, (snapshot) => {
      const todos = snapshot.val();
      const newTodoList: IPos[] = [];

      for (let id in todos) {
        newTodoList.push({ id, ...todos[id] });
      }

      setTodoList(newTodoList);
    });
  }, [db]);

  const changeTodoCompletion = (todo: IPos) => {
    const todoRef = ref(db, "/todos/" + todo.id);
    update(todoRef, { done: !todo.done });
  };
  return isLoaded ? (
    <>
      <button onClick={addPos}>allo</button>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        clickableIcons={false}
        zoom={zoom}
        options={OPTIONS}
      >
        <MarkerF position={pos} />
      </GoogleMap>
    </>
  ) : (
    <></>
  );
};

export default Map;
