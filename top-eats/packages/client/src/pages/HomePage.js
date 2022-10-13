import React from "react";
import SearchBar from "../components/SearchBar/SearchBar";
import Header from "../components/Header/Header";
import RestaurantResults from "../components/RestaurantResults/RestaurantResults";
import { Container } from 'react-bootstrap'

const HomePage = ({restaurants, setRestaurants, user, setUser}) => {

  return (
    <>
      <Header user={user} setUser={setUser}/>
      <Container style={{maxWidth: '1024px', minWidth: '400px'}}>
        <SearchBar restaurants={restaurants} setRestaurants={setRestaurants}/>
        <RestaurantResults  restaurants={restaurants}/>
      </Container>
    </>
  );
};

export default HomePage;