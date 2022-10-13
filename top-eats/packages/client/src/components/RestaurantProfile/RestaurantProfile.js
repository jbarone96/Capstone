import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import ReviewForm from "../ReviewForm/ReviewForm";
// import StarRating from "react-bootstrap-star-rating";
import InactiveReviewForm from "../InactiveReviewForm/InactiveReviewForm";

const RestaurantProfile = ({ restaurant, reviews, user, setReviews }) => {
  // I still need to call the business details api. So I need to get the restaurant id and call that in the backend
  const id = restaurant.id;
  const [details, setDetails] = useState();
  const totalRating = reviews
    .map((review) => review.rating)
    .reduce((curr, acc) => curr + acc, 0);
  const averageRating = (totalRating / reviews.length).toFixed(1);
  const starsArray = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(0);

  console.log(averageRating);
  useEffect(() => {
    const getDetails = async () => {
      try {
        const restaurantDetails = await axios.get(
          `http://localhost:3001/api/restaurant/${id}`
        );
        setDetails(restaurantDetails.data);
        // console.log(restaurantListAPI.data)
        // setPostLoading(false)
      } catch (err) {
        // console.error(err.message
        // setPostLoading(false)
        // setPostError(true)
      }
    };
    getDetails();
   
  }, []); // add correct dependency array []
  console.log(details);

  return (
  <>
      {details ? (
        <Card style={{marginTop: '30px'}}>
          <Card.Body>
            <Card.Title style={{ fontSize: "48px" }}>{details.name}</Card.Title>
            <Card.Subtitle style={{ fontSize: "20px" }}>
              {details.location.display_address[0]},{" "}
              {details.location.display_address[1]}
            </Card.Subtitle>
            <Card.Text>
              {details.phone ? `Phone: ${details.phone}` : ""}
            </Card.Text>
            <Card.Text>
             
              Rating:{" "}
              {averageRating === "NaN" ? (
                "No Rating"
              ) : (
                <div
                  className="star-rating"
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    width: "100px",
                    marginBottom: "20px",
                    marginTop: "-32px",
                    marginLeft: "55px",
                  }}
                  required
                >
                  {starsArray.map((star, idx) => {
                    idx += 1;
                    return (
                      <button
                        type="button"
                        key={idx}
                        className={
                          idx <= parseInt(averageRating) ? "on" : "off"
                        }
                      >
                        <div className="star">&#9733;</div>
                      </button>
                    );
                  })}
                </div>
              )}{" "}
              <div>{reviews.length} reviews</div>
            </Card.Text>

            {details.hours ? (
              <>
                <h2>Hours:</h2>
                <p>
                  {details.hours[0].open.map((day, i) => {
                    const days = [
                      "Sunday",
                      "Monday",
                      "Tuesday",
                      "Wednesday",
                      "Thursday",
                      "Friday",
                      "Saturday",
                    ];
                    return (
                      <div key={i}>
                        {days[day.day]}:{" "}
                        {day.start >= "1200"
                          ? parseInt(day.start.slice(0, 2)) -
                            12 +
                            ":" +
                            day.start.slice(2) +
                            "pm "
                          : day.start < "1000"
                          ? day.start.slice(1, -2) +
                            ":" +
                            day.start.slice(2) +
                            "am "
                          : day.start.slice(0, 2) +
                            ":" +
                            day.start.slice(2) +
                            "am "}
                        to{" "}
                        {day.end == "0000"
                          ? "12:00am"
                          : parseInt(day.end.slice(0, 2)) -
                            12 +
                            ":" +
                            day.end.slice(2) +
                            "pm"}
                      </div>
                    );
                  })}
                </p>
              </>
            ) : (
              ""
            )}
            <h3>Photos</h3>
            <Container style={{margin: '0 auto'}}>
              {details.photos.map((photo, i) => {
                return (
                  <Card.Img
                    style={{ width: "200px", height: '200px', objectFit: 'cover', margin: "20px" }}
                    src={photo}
                    key={i}
                  />
                );
              })}
            </Container>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
      <div>

        {user ? <ReviewForm user={user} restaurant={restaurant} reviews={reviews} setReviews={setReviews}/> : <InactiveReviewForm />}

        
      </div>
   </>
  );
};

export default RestaurantProfile;
