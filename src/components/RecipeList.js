import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from './FavoriteIcon';

const generateRandomRating = () => (Math.random() * (5 - 4) + 4).toFixed(1);
const generateRandomTime = () => Math.floor(Math.random() * (40 - 30 + 1)) + 30;

const RecipeList = ({ recipes }) => {
  const navigate = useNavigate(); 
  const [favorites, setFavorites] = useState([]);
  const recipesWithRatingsAndTimes = recipes.map((recipe) => ({
    ...recipe,
    rating: generateRandomRating(),  
    time: generateRandomTime(),  
  }));
   // Retrieve favorites from localStorage when component mounts
   useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <>
    <div className="home-container">
      <div className="recipe-grid">
        {recipesWithRatingsAndTimes && recipesWithRatingsAndTimes.length > 0 ? (
          recipesWithRatingsAndTimes.map((recipe) => (
            <div key={recipe.idMeal} className="recipe-card">
              <img
                className="recipe-image"
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />
              <div className="recipe-details">
                <h3
                  className="recipe-title"
                  onClick={() => 
                    navigate(`/recipe/${recipe.idMeal}`, {
                      state: { rating: recipe.rating, time: recipe.time } 
                    })
                  }
                >
                  {recipe.strMeal}
                </h3>
                <p className="recipe-time">{recipe.time} min</p> 
                <div className="rating">
                  <span className="stars">⭐ {recipe.rating}</span>
                  <FavoriteIcon  recipe={recipe} favorites={favorites} setFavorites={setFavorites} />
                </div>
              </div>
            </div>
          ))
        ) : null}
      </div>
      {!recipes || recipes.length === 0 ? (
       <div className="no-data">
          <img src="/assets/No-Found.png" alt="No recipes"/>
      </div>
      ) : null}
      </div>
    </>
  );
};

export default RecipeList;
