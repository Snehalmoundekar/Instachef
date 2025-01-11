import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { fetchFullRecipe } from '../services/mealdbApi';

const FullRecipe = () => {
  const { id: recipeId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [recipeDetails, setRecipeDetails] = useState(null);
  
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);

  // Fetch recipe details based on ID
  useEffect(() => {
    const getRecipeDetails = async () => {
      const details = await fetchFullRecipe(recipeId);
      setRecipeDetails(details);
    };

    if (recipeId) {
      getRecipeDetails();
    }
  }, [recipeId]);

  // If the recipe is still loading, show a loading state
  if (!recipeDetails) {
    return (
      <div className="loading-container">
        <div className="loader"></div>
        <p className="loading-text">Fetching your recipe...</p>
      </div>
    );
  }

  const generateRandomServings = () => Math.floor(Math.random() * (6 - 4 + 1)) + 4;
  const { rating, time } = location.state || { rating: 'N/A', time: 'N/A' };

  const servings = generateRandomServings();

  return (
    <div className="full-recipe-container">
      <div className="recipe-header">
        <img
          src={recipeDetails.strMealThumb}
          alt={recipeDetails.strMeal}
          className="recipe-image"
        />
      </div>
      <div className="recipe-content">
        <div className="recipe-column ingredients-section">
          <h2 className="recipe-title">{recipeDetails.strMeal}</h2>
          <span className="border-bottom"></span>
          <div className="recipe-meta">
            <div className="meta-item">
              <i className="fas fa-utensils"></i>
              <span>{servings} servings</span>
            </div>
            <div className="meta-item">
              <i className="fa-solid fa-clock" style={{ color: '#404040' }}></i>
              <span>{time} minutes</span>
            </div>
          </div>
          <h3 className="title">Ingredients</h3>
          <ul>
            {Object.keys(recipeDetails)
              .filter((key) => key.startsWith('strIngredient') && recipeDetails[key])
              .map((key, index) => (
                <li key={index}>
                  {recipeDetails[key]} - {recipeDetails[`strMeasure${index + 1}`]}
                </li>
              ))}
          </ul>
          <div className="notes-section">
            <h4>Notes</h4>
            <p>Prepare all ingredients beforehand for a smoother cooking process.</p>
          </div>
        </div>
        <div className="recipe-column directions-section">
          <div className="rating">
            <span className="stars">⭐ {rating}</span>
          </div>
          <h3 className="title">Directions</h3>
          <p>{recipeDetails.strInstructions}</p>
        </div>
      </div>
      <button className="close-button" onClick={() => navigate(-1)}>
        Close
      </button>
    </div>
  );
};

export default FullRecipe;
