import { IPos } from "@/interfaces/IPos";

export default function distance(pos1: IPos, pos2: IPos) {
  var radlat1 = (Math.PI * pos1.lat) / 180;
  var radlat2 = (Math.PI * pos2.lat) / 180;
  var theta = pos1.lng - pos2.lng;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  dist = dist * 1.609344;
  return dist;
}
