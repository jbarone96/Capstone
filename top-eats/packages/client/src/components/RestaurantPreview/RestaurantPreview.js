import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const restaurantPreview = ({ restaurant }) => {
  return (
    <Card style={{ margin: "20px 0" }}>
      <Card.Body>
        <Card.Title>{restaurant.name}</Card.Title>
        <Card.Text>
          {restaurant.location.display_address[0]},{" "}
          {restaurant.location.display_address[1]}
        </Card.Text>
        <Card.Text>
          <Link to={`/restaurant/${restaurant.id}`} state={{ restaurant }}>
            More Info
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default restaurantPreview;
