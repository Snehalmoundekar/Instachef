import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchRecipesByCategory } from "../services/mealdbApi";
import FavoriteIcon from "./FavoriteIcon";

const FanFavorite = ({ favorites, setFavorites }) => {
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const generateRandomTime = () => Math.floor(Math.random() * (40 - 30 + 1)) + 30;

  // Shuffle array function
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.5);  // Shuffle using random sort
  };

  useEffect(() => {
    const getSeafoodRecipes = async () => {
      try {
        const fetchedRecipes = await fetchRecipesByCategory("Seafood");
        const recipesWithRatingsAndTimes = fetchedRecipes.map((recipe) => ({
          ...recipe,
          rating: (Math.random() * (5 - 4) + 4).toFixed(1),
          time: generateRandomTime(),
        }));
        
        // Shuffle recipes and set the first 8
        const shuffledRecipes = shuffleArray(recipesWithRatingsAndTimes).slice(0, 8);
        setRecipes(shuffledRecipes);
      } catch (error) {
        console.error("Error fetching Seafood recipes:", error);
      }
    };

    getSeafoodRecipes();
  }, []);

  return (
    <div className="fan-favorite">
      <h2 className="section-title">Fan Favorites</h2>
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
  );
};

export default FanFavorite;
