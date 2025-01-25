import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecipesByIngredient } from "../services/mealdbApi";
import WhatWereCraving from "./WhatWereCraving";
import TimeforDessert from "./TimeforDessert";
import Collection from "./Collection";
import FanFavorite from "./FanFavorite";
import FavoriteIcon from "./FavoriteIcon";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  // Initialize favorites from localStorage
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    if (favorites.length > 0) {
      localStorage.setItem("favorites", JSON.stringify(favorites));
    }
  }, [favorites]);

  const generateRandomTime = () => Math.floor(Math.random() * (40 - 30 + 1)) + 30;

  const getRecipes = useCallback(async () => {
    const fetchedRecipes = await fetchRecipesByIngredient("");
    const recipesWithRatingsAndTimes = fetchedRecipes.map((recipe) => ({
      ...recipe,
      rating: (Math.random() * (5 - 4) + 4).toFixed(1),
      time: generateRandomTime(),
    }));
    setRecipes(recipesWithRatingsAndTimes.slice(0, 4));
  }, []); // Empty dependency array ensures that getRecipes doesn't change

  useEffect(() => {
    getRecipes(); // Calls getRecipes on mount
  }, [getRecipes]); // Add getRecipes as a dependency

  return (
    <>
      <div className="video-container">
        <video className="home-video" autoPlay muted loop>
          <source src="/instachef/assets/Banner_Video.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="home-container">
        <WhatWereCraving  favorites={favorites} setFavorites={setFavorites} />
        <div className="trending-now">
          <h2 className="section-title">Trending Now</h2>
          <div className="recipe-grids">
            {recipes.map((recipe) => (
              <div key={recipe.idMeal} className="recipe-card">
                <img className="recipe-image" src={recipe.strMealThumb} alt={recipe.strMeal} />
                <div className="recipe-details">
                  <h3
                    className="recipe-title"
                    onClick={() =>
                      navigate(`/recipe/${recipe.idMeal}`, {
                        state: { rating: recipe.rating, time: recipe.time },
                      })
                    }
                  >
                    {recipe.strMeal}
                  </h3>
                  <p className="recipe-time">{recipe.time} min</p>
                  <div className="rating">
                    <span className="stars">⭐ {recipe.rating}</span>
                    {/* Pass favorites and setFavorites to FavoriteIcon */}
                    <FavoriteIcon
                      recipe={recipe}
                      favorites={favorites}
                      setFavorites={setFavorites}
                      additionalData={{ rating: recipe.rating, time: recipe.time }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <TimeforDessert favorites={favorites} setFavorites={setFavorites} />
        <Collection />
        <FanFavorite favorites={favorites} setFavorites={setFavorites} />
      </div>
    </>
  );
};

export default Home;
