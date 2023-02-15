import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getRestaurantById } from "@/lib/api/restaurant";
import IRestaurant from "@/interfaces/IRestaurant";
import Header from "@/components/layout/Header";
import StarRating from "@/components/restaurant/StarRating";

const Restaurant = () => {
  const router = useRouter();
  const { id } = router.query;
  const [restaurant, setRestaurant] = useState<IRestaurant>();

  useEffect(() => {
    const pid = Array.isArray(id) ? id[0] : id;
    if (!pid) return;
    const fetchRestaurant = async () => {
      setRestaurant(await getRestaurantById(pid));
    };
    fetchRestaurant();
    console.log(restaurant);
  }, [router.isReady]);
  if (!restaurant) return <div>error...</div>;
  return (
    <div className="restaurant-container">
      <div className="restaurant-info">
        <h2>{restaurant.name}</h2>
        <p>{restaurant.address}</p>
      </div>
      <h3>Moyenne des poutines</h3>
      <StarRating rating={4} />
      <h3>Évaluations</h3>
      <div className="ratings-container">
        {restaurant.reviews ? (
          restaurant.reviews.map((review) => (
            <div className="rating-card">
              <div className="rating-top">
                <p>{review.userID}</p>
                <StarRating rating={review.note} />
              </div>
              <p>
                {review.commentaire} Lorem ipsum dolor sit amet consectetur,
                adipisicing elit. Praesentium placeat, animi illum commodi quas
                ad. Distinctio saepe velit non blanditiis expedita laudantium,
                qui libero et nemo cum magni maiores delectus.
              </p>
            </div>
          ))
        ) : (
          <p>Aucune évaluation</p>
        )}
      </div>
    </div>
  );
};

export default Restaurant;
