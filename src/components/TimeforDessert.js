import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecipesByCategory } from "../services/mealdbApi";
import FavoriteIcon from "./FavoriteIcon";

const TimeforDessert = ({ favorites, setFavorites }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const generateRandomTime = () => Math.floor(Math.random() * (40 - 30 + 1)) + 30;

  useEffect(() => {
    const getDessertRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipesByCategory("Dessert");
        const recipesWithRatingsAndTimes = fetchedRecipes.map((recipe) => ({
          ...recipe,
          rating: (Math.random() * (5 - 4) + 4).toFixed(1),
          time: generateRandomTime(),
        }));
        const shuffledRecipes = [...recipesWithRatingsAndTimes].sort(() => 0.5 - Math.random());
        setRecipes(shuffledRecipes.slice(0, 3));
      } catch (error) {
        console.error("Error fetching Dessert recipes:", error);
      }
    };

    getDessertRecipes();
  }, []);

  return (
    <div className="craving-section">
      <h2 className="section-title">Time for Dessert</h2>
      <div className="recipe-grids">
        {recipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe-card">
            <img
              className="recipe-image"
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
            />
            <div className="rating-overlay">
              <div className="rating">
                <span className="stars">⭐ {recipe.rating}</span>
                {/* Pass favorites, setFavorites, and additionalData (rating and time) to FavoriteIcon */}
                <FavoriteIcon
                  recipe={recipe}
                  favorites={favorites}
                  setFavorites={setFavorites}
                  additionalData={{ rating: recipe.rating, time: recipe.time }}
                />
              </div>
            </div>
            <div className="recipe-overlay">
              <div className="recipe-text">
                <p className="collection-label">COLLECTION</p>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TimeforDessert;
