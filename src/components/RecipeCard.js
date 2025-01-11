import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchRecipesByIngredient, fetchRecipesByName } from '../services/mealdbApi';
import FavoriteIcon from './FavoriteIcon';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


const RecipeCard = () => {
  const [recipes, setRecipes] = useState([]);
  const [sliderRecipes, setSliderRecipes] = useState([]);

  const [ingredient] = useState('');
  const [name] = useState('');
  const [displayCount, setDisplayCount] = useState(8);
  const [favorites, setFavorites] = useState([]);
  const navigate = useNavigate();

  const generateRandomTime = () => Math.floor(Math.random() * (40 - 30 + 1)) + 30;

  useEffect(() => {
    const getRecipes = async () => {
      let fetchedRecipes = [];
      if (ingredient) {
        fetchedRecipes = await fetchRecipesByIngredient(ingredient);
      } else if (name) {
        fetchedRecipes = await fetchRecipesByName(name);
      } else {
        fetchedRecipes = await fetchRecipesByIngredient('');
      }
      const recipesWithRatingsAndTimes = fetchedRecipes.map((recipe) => ({
        ...recipe,
        rating: (Math.random() * (5 - 4) + 4).toFixed(1),
        time: generateRandomTime(),
      }));

      const shuffledRecipes = [...recipesWithRatingsAndTimes].sort(() => 0.5 - Math.random());
      setRecipes(shuffledRecipes.slice(0, displayCount));
      setSliderRecipes(shuffledRecipes.slice(-5));
    };

    getRecipes();
  }, [ingredient, name, displayCount]);
  const loadMoreRecipes = () => {
    setDisplayCount((prevCount) => prevCount + 8);
  };
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // Retrieve favorites from localStorage when component mounts
  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  return (
    <>
      <div className="slider-container">
        <Slider {...sliderSettings}>
          {sliderRecipes.map((recipe) => (
            <div key={recipe.idMeal} className="slide">
              <img
                className="slider-image"
                src={recipe.strMealThumb}
                alt={recipe.strMeal}
              />
              <div className="overlay"></div>
              <div className="slide-content">
                {/* <p className="trending-label">Recommended Recipes</p> */}
                <h2
                  className="slide-title"
                  onClick={() =>
                    navigate(`/recipe/${recipe.idMeal}`, {
                      state: { rating: recipe.rating, time: recipe.time },
                    })
                  }
                >
                  {recipe.strMeal}
                </h2>
                <p className="slide-author">By {recipe.strMeal}</p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      <div className="home-container recipe-card-container">
        <h3 className="section-title">Recommended Recipes</h3>
        <div className="recipe-grid">
          {recipes.map((recipe) => (
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
                      state: { rating: recipe.rating, time: recipe.time },
                    })
                  }
                >
                  {recipe.strMeal}
                </h3>
                <p className="recipe-time">{recipe.time} min</p>
                <div className="rating">
                  <span className="stars">⭐ {recipe.rating}</span>
                  <FavoriteIcon recipe={recipe} favorites={favorites} setFavorites={setFavorites} />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="load-more-container">
          <button onClick={loadMoreRecipes} className="load-more-button">
            Load More
          </button>
        </div>
      </div>
    </>
  );
};

export default RecipeCard;
