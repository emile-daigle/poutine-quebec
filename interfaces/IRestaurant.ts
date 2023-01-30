import { IPos } from "./IPos";
import IReview from "./IReview";

export default interface IRestaurant extends IRestaurantInfo{
  reviews: IReview[];
}

export interface IRestaurantInfo {
  name: string;
  pos: IPos;
  address : string;
}