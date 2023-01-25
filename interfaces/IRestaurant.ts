import { IPos } from "./IPos";
import IReview from "./IReview";

export default interface Restaurant {
  name: string;
  pos: IPos;
  reviews: IReview[];
}
