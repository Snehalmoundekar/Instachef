import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate
import { fetchRecipesByCategory } from "../services/mealdbApi";

const Collection = () => {
  const [recipeData, setRecipeData] = useState(null);
  const navigate = useNavigate();  // Initialize navigate function

    // Generate a random time between 30 and 40 minutes
    const generateRandomTime = () => Math.floor(Math.random() * (40 - 30 + 1)) + 30;


  // Fetch and shuffle recipes dynamically
  useEffect(() => {
    const getRecipes = async () => {
      try {
        const recipes = await fetchRecipesByCategory("Breakfast");
        if (recipes.length > 0) {
          const shuffledRecipes = recipes.sort(() => 0.5 - Math.random());
          const randomRecipe = shuffledRecipes[0];
          setRecipeData({
            idMeal: randomRecipe.idMeal, 
            image: randomRecipe.strMealThumb,
            title: randomRecipe.strMeal,
            description: `Try this delicious recipe for ${randomRecipe.strMeal} and make your Breakfast a delightful experience! Packed with flavors that will awaken your taste buds, this dish is perfect for energizing your mornings. Whether you're looking for something quick, nutritious, or simply indulgent, ${randomRecipe.strMeal} is the perfect choice to brighten your day.`,
            rating: (Math.random() * (5 - 4) + 4).toFixed(1),  
            time: generateRandomTime(),
          });
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      }
    };

    getRecipes();
  }, []);

  return (
    <div className="collection-recipes-container">
      {recipeData ? (
        <>
          <div className="image-section">
            <img
              src={recipeData.image}
              alt={recipeData.title}
              className="recipe-image"
            />
          </div>
          <div className="text-section">
            <div className="recipe-info">
              <p className="recipe-rating">⭐ {recipeData.rating}</p>
              <p className="recipe-time">⏰ {recipeData.time} min</p>
            </div>
            <h4 className="collection-title">Breakfast COLLECTION</h4>
            <h1
              className="main-title"
              onClick={() =>
                navigate(`/recipe/${recipeData.idMeal}`, {  // Use the idMeal for navigation
                  state: { title: recipeData.title, description: recipeData.description, rating: recipeData.rating, time: recipeData.time },
                })
              }
            >
              {recipeData.title}
            </h1>
            <p className="description">{recipeData.description}</p>
          </div>
        </>
      ) : (
        <div className="loading-container">
          <div className="loader"></div>
          <p className="loading-text">Fetching your recipe...</p>
        </div>
      )}
    </div>
  );
};

export default Collection;
