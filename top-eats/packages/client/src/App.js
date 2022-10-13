import React, {useState} from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import UserProfile from "./pages/UserProfile";
import {useLocalStorage} from "./hooks/useLocalStorage";
import {useSessionStorage} from "./hooks/useSessionStorage";

function App() {
  const [restaurants, setRestaurants] = useSessionStorage("restaurants", null);
  const [user, setUser] = useLocalStorage("user", null);
  const [lastPath, setLastPath] = useState('');

  return (
    <>
      <Routes>
          <Route exact path='/' element={ <HomePage user={user} setUser={setUser} restaurants={restaurants} setRestaurants={setRestaurants} /> } />
          <Route exact path='/restaurant/:id' element={ <RestaurantPage restaurants={restaurants} setRestaurants={setRestaurants} user={user} setUser={setUser}/> } />
          <Route exact path='/signup' element={ <SignUpPage setUser={setUser} setLastPath={setLastPath}/> } />
          <Route exact path='/signin' element={ <SignInPage setUser={setUser} lastPath={lastPath} setLastPath={setLastPath}/> } />
          <Route exact path='/userProfile' element={ <UserProfile user={user} setUser={setUser} /> } />
      </Routes>
    </>
  );
}

export default App;
