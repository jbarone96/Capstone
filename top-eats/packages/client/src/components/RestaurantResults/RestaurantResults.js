import React from "react";
import { Container } from "react-bootstrap";
import RestaurantPreview from "../RestaurantPreview/RestaurantPreview";

const RestaurantResults = ({ restaurants }) => {
  return (
    <>
     
        {restaurants
          ? restaurants.map((restaurant, i) => (
              <RestaurantPreview restaurant={restaurant} key={i} />
            ))
          : ""}
 
    </>
  );
};

export default RestaurantResults;
