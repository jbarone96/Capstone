import React, {useState} from "react";
import {
    Button,
    Container,
    FloatingLabel,
    FormControl,
    Card,
    Form,
  } from "react-bootstrap";
import "../ReviewForm/ReviewForm.css";
import {Link} from 'react-router-dom';



const InactiveReviewForm = () => {
    const starsArray = [1, 2, 3, 4, 5];
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    
    return (
        <Container>
          <Card style={{ padding: "25px", marginTop: "30px" }}>
            <Card.Title style={{ fontSize: "24px" }}>Write a Review</Card.Title>
            <Card.Body style={{ marginLeft: "-15px" }}>
    
              <Form>
              <div
                className="star-rating"
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100px",
                  marginBottom: "20px",
                  marginTop: "-30px",
                }}
                >
                {starsArray.map((star, idx) => {
                  idx += 1;
                  return (
                    <button
                    disabled
                    type="button"
                    key={idx}
                    className={idx <= ((rating && hover) || hover) ? "on" : "off"}
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
                  as="textarea"
                  placeholder="Your review here."
                  style={{ height: "150px" }}
                  name='text'
                //   value={reviewData.text}
                //   onChange={handleInputChange}
                  disabled
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
                type='submit'
                variant="success"
                style={{
                  width: "125px",
                  height: "40px",
                  fontSize: "14px",
                  marginTop: "10px",
                  float: "right",
                }}
                disabled
                >
                Submit
              </Button>
                </Form>
              <p style={{textAlign: 'center', marginTop: '30px'}}><Link to="/signin">Log In</Link> to Write a Review</p>
            </Card.Body>
          </Card>
        </Container>
      );
}

export default InactiveReviewForm;