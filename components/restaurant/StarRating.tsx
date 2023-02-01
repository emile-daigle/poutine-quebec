import React from "react";

const StarRating = ({rating} : {rating : number}) => {
  return (
    <div className="star-rating">
      {[...Array(rating)].map((star) => {
        return <span className="on">&#9733;</span>;
      })}
      {[...Array(5 - rating)].map((star) => {
        return <span className="off">&#9733;</span>;
      })}
    </div>
  );
};

export default StarRating;
