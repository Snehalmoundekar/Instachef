import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "./FavoriteIcon";

const FavoriteRecipes = () => {
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Get favorite recipes from localStorage
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  if (favorites.length === 0) {
    return (
      <div className="no-data">
        <img src="/assets/No-Found.png" alt="No recipes" />
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="craving-section">
        <h2 className="section-title">Kitchen Favorites</h2>
        <div className="recipe-grid">
          {favorites.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img
                className="recipe-image"
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />
              <div className="rating-overlay">
                <div className="rating">
                  <span className="stars">⭐ {recipe.rating}</span>
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
    </div>
  );
};

export default FavoriteRecipes;
