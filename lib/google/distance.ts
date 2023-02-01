import { IPos } from "@/interfaces/IPos";

export default async function getDistanceOneToOne(pos1: IPos, pos2: IPos) {
  const Location1Str = pos1.lat + "," + pos1.lng;
  const Location2Str = pos2.lat + "," + pos2.lng;

  let ApiURL = "https://maps.googleapis.com/maps/api/distancematrix/json?";

  let params = `origins=${Location1Str}&destinations=${Location2Str}&key=${"GOOGLEKEY"}`; // you need to get a key
  let finalApiURL = `${ApiURL}${encodeURI(params)}`;

  let fetchResult = await fetch(finalApiURL); // call API
  let Result = await fetchResult.json(); // extract json

  return Result.rows[0].elements[0].distance as number;
}
