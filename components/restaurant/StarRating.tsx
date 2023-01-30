import React from 'react'

const StarRating = (rating : number) => {
    return (
      <div className="star-rating">
        {[...Array(rating)].map((star) => {        
          return (         
            <span className="star">&#9733;</span>        
          );
        })}
        {[...Array(5-rating)].map((star) => {        
          return (         
            <span className="star">&#9733;</span>        
          );
        })}
      </div>
    );
  };
  