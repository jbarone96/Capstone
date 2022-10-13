import React from 'react'
import { Container } from 'react-bootstrap'
import Review from '../Review/Review'

const ReviewList = ({ reviews, header }) => {
    return (
    <Container style={{margin: '20px auto', padding: '0'}}>
      <h1>{header}</h1>
      { reviews ? 
      reviews.map((review, i) => {
        return (


          <Review key={i} review={review} />
        )
      })
      
      : 'No reviews :('

      }

    </Container>
  )
}

export default ReviewList