import { IPos } from "./IPos";
import IReview from "./IReview";

export default interface IRestaurant extends IRestaurantInfo {
  reviews: IReview[];
}

export interface IRestaurantInfo {
  id: number;
  name: string;
  pos: IPos;
  address: string;
  distance?: number;
  uid?: string;
}
