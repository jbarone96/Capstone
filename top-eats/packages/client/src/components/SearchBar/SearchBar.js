import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import RestaurantResults from "../../components/RestaurantResults/RestaurantResults";
// import { useSearchParams } from "react-router-dom";

const initialState = {
  term: "",
  location: "",
  categories: "food",
  limit: 10,
};

const SearchBar = ({ restaurants, setRestaurants }) => {
  const [searchInput, setSearchInput] = useState(initialState);
  const [showStuff, setShowStuff] = useState(false);
  const [results, setResults] = useState({
    term: "",
    location: "",
  });

  const handleChange = (e) => {
    setSearchInput({
      ...searchInput,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const restaurantListAPI = await axios.post(
        "http://localhost:3001/api/restaurants",
        searchInput
      );
      console.log(restaurantListAPI.data);
      setRestaurants(restaurantListAPI.data);
    } catch (error) {
      console.log(error);
    }
  };

  const capitalize = (str) => {
    let index = str.indexOf(",");
    let finalStr = "";
    if (index > -1) {
      finalStr =
        str.charAt(0).toUpperCase() +
        str.slice(1, index).toLowerCase() +
        str.slice(index).toUpperCase();
    } else {
      finalStr = str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }
    return finalStr;
  };

  const searchAndDisplay = (e) => {
    handleSearch(e);
    setShowStuff(true);
    console.log(
      setResults({
        ...results,
        term: searchInput.term,
        location: searchInput.location,
      })
    );
  };

  const Stuff = () => (
    <div id="results-showcase">
      Showing results for "{capitalize(results.term)}" around "{capitalize(results.location)}"
    </div>
  );

  return (
    <>
      
        <Form style={{ margin: "40px 0" }}>
          <Row style={{ width: "100%"}}>
            <Col xs={5} style={{padding: '0'}}>
              <Form.Control
                size="lg"
                type="text"
                name="term"
                placeholder="Food"
                value={searchInput.term}
                onChange={handleChange}
              />
            </Col>
            <Col xs={5} style={{padding: '0 25px'}}>
              <Form.Control
                size="lg"
                type="text"
                name="location"
                value={searchInput.location}
                placeholder="Location"
                onChange={handleChange}
              />
            </Col>
            <Col xs={2} className="justify-content-center" style={{padding: '0'}}>
              <Button
                as="div"
                style={{ minWidth: "100%" }}
                type="submit"
                size="lg"
                variant="warning"
                onClick={searchAndDisplay}
              >
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        {showStuff ? ({ handleSearch }, (<Stuff />)) : ""}
     
      <RestaurantResults searchInput={searchInput} />
      {/* <div id="results-showcase">
        Search results for {searchInput.term} in {searchInput.location}
      </div> */}
    </>
  );
};

export default SearchBar;
