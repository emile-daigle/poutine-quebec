import { IPos } from "./IPos";
import IReview from "./IReview";

export default interface IRestaurant {
  name: string;
  pos: IPos;
  reviews: IReview[];
}
