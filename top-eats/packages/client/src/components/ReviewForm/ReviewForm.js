import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  FloatingLabel,
  FormControl,
  Card,
  Form,
} from "react-bootstrap";
import "../ReviewForm/ReviewForm.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

const ReviewForm = ({ restaurant, user, reviews, setReviews }) => {
  const starsArray = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const initialState = {
    userID: user.result._id,
    text: "",
    rating: null, // needs to be fixed
    restaurantID: restaurant.id,
  };

  const [reviewData, setReviewData] = useState(initialState);
  const [validated, setValidated] = useState(false);

  // Code copied from snippets

  // const [reviews, setReviews] = useState(null)

  const handleInputChange = (event) => {
    setReviewData({
      ...reviewData,
      [event.target.name]: event.target.value,
    });
  };

  console.log(reviewData);

  const handleReviewSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    setValidated(false);

    if (reviewData.text == "" && reviewData.rating == 0) {
      const toaster = toast.loading(
        "Please wait...",
        setTimeout(() => {
          toast.update(toaster, {
            render: "Please fill out all fields!",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }, 1000)
      );
    } else if (reviewData.text == "" || reviewData.rating == 0) {
      const toaster = toast.loading(
        "Please wait...",
        setTimeout(() => {
          toast.update(toaster, {
            render: "Please fill out all fields!",
            type: "error",
            isLoading: false,
            autoClose: 5000,
          });
        }, 1000)
      );
    } else {
      const toaster = toast.loading(
        "Please wait...",
        setTimeout(() => {
          toast.update(toaster, {
            render: "Review posted successfully!",
            type: "success",
            isLoading: false,
            autoClose: 5000,
          });
        }, 1500)
      );
    }
    console.log(rating);
    setReviewData({
      ...reviewData,
      [rating]: rating,
      // rating: rating
      // isSubmitting: true,
      // errorMessage: null,
    });
    // }
    console.log(reviewData)
    console.log(rating)
    axios
      .post('http://localhost:3001/api/newReview', reviewData)
      .then(
        (res) => {
          setReviewData(initialState)
          setReviews(() => [
            ...reviews.reverse(),
            {
                reviewBody: reviewData.text,
                rating: reviewData.rating,
                author: reviewData.userID,
                restaurantID: reviewData.restaurantID,
                createdAt: new Date()
            },
          ])
          setReviewData(initialState);
          setRating(0);
          setHover(0);
        },
        (error) => {
          console.log(error)
          setReviewData({
            ...reviewData,
            // isSubmitting: false,
            // errorMessage: error.message,
          })
        }
      )
  }
  // useEffect(() => {
  //   const getReviews = async () => {
  //     try {
  //       console.log(reviewData)
  //       const allReviews = await axios.post(`/restaurantReviews/${restaurant.id}`)
  //       // setPosts(allPosts.data)
  //       // setPostLoading(false)
  //     } catch (err) {
  //       console.error(err.message)
  //       // setPostLoading(false)
  //       // setPostError(true)
  //     }
  //   }
  //   getReviews()
  // }, [])
  // end code copied from snippets

  useEffect(() => {
    const getRating = async () => {
      console.log(rating);
      try {
        setReviewData({
          ...reviewData,
          rating: rating,
        });
      } catch (err) {
        console.error(err.message);
      }
    };
    getRating();
  }, [rating]);

  return (
    <>
        <Card style={{ padding: "25px", marginTop: "30px" }}>
          <Card.Title style={{ fontSize: "24px" }}>Write a Review</Card.Title>
          <Card.Body style={{ marginLeft: "-15px" }}>
            <Form onSubmit={handleReviewSubmit}>
              <div
                className="star-rating"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100px",
                  marginBottom: "20px",
                  marginTop: "-30px",
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
                        idx <= ((rating && hover) || hover) ? "on" : "off"
                      }
                      onClick={() => setRating(idx)}
                      onMouseEnter={() => setHover(idx)}
                      onMouseLeave={() => setHover(rating)}
                      onDoubleClick={() => {
                        setRating(0);
                        setHover(0);
                      }}
                    >
                      <div className="star">&#9733;</div>
                    </button>
                  );
                })}
              </div>
              <FloatingLabel label="Your Review Here">
                <FormControl
                  // as="textarea"
                  placeholder="Your review here."
                  style={{ height: "150px", width: '50vw', maxWidth: '900px'}}
                  name="text"
                  value={reviewData.text}
                  onChange={handleInputChange}
                ></FormControl>
              </FloatingLabel>
              {/* <Button
            variant="info"
            style={{
              width: "125px",
              height: "40px",
              fontSize: "14px",
              marginTop: "10px",
            }}
            >
            Add Photos
          </Button> */}
              <Button
                type="submit"
                variant="success"
                style={{
                  width: "125px",
                  height: "40px",
                  fontSize: "14px",
                  marginTop: "10px",
                  float: "right",
                }}
              >
                Submit
              </Button>
            </Form>
          </Card.Body>
        </Card>
      
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{
          marginRight: "-100px",
          padding: "20px",
          width: "375px",
          overflow: "hidden",
        }}
      />
    </>
  );
};

export default ReviewForm;
