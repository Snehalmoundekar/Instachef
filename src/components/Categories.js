import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { fetchCategories, fetchRecipesByIngredient, fetchRecipesByCategory } from "../services/mealdbApi";
import FavoriteIcon from "./FavoriteIcon";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [initialRecipes, setInitialRecipes] = useState([]);
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [favorites, setFavorites] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(true); // Loading state for categories
    const navigate = useNavigate();
    const generateRandomRating = () => (Math.random() * (5 - 4) + 4).toFixed(1);
    const generateRandomTime = () => Math.floor(Math.random() * (40 - 30 + 1)) + 30;

    useEffect(() => {
        const loadCategoriesWithData = async () => {
            const fetchedCategories = await fetchCategories();
            const categoriesWithData = [];

            for (const category of fetchedCategories) {
                const recipes = await fetchRecipesByCategory(category.strCategory);
                if (recipes.length > 0) {
                    categoriesWithData.push(category);
                }
            }

            setCategories(categoriesWithData);
            setLoadingCategories(false); // Set loading to false once categories are fetched
        };

        loadCategoriesWithData();
    }, []);

    useEffect(() => {
        const loadInitialRecipes = async () => {
            const recipes = await fetchRecipesByIngredient("");
            const recipesWithRatingsAndTimes = recipes.map((recipe) => ({
                ...recipe,
                rating: generateRandomRating(),
                time: generateRandomTime(),  
            }));
            setInitialRecipes(recipesWithRatingsAndTimes.slice(0, 8));
        };

        loadInitialRecipes();
    }, []);

    useEffect(() => {
        const loadFilteredRecipes = async () => {
            if (selectedCategory) {
                const recipes = await fetchRecipesByCategory(selectedCategory);
                const recipesWithRatingsAndTimes = recipes.map((recipe) => ({
                    ...recipe,
                    rating: generateRandomRating(),
                    time: generateRandomTime(),  
                }));
                setFilteredRecipes(recipesWithRatingsAndTimes);
            } else {
                setFilteredRecipes([]);
            }
        };

        loadFilteredRecipes();
    }, [selectedCategory]);

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    const colorArray = ['#F6784C', '#C4D600', '#EAAA00', '#ED8B00'];

    return (
        <div className="categories-container">
            <div className="filter-group">
                <h3>Select a Category</h3>
                {loadingCategories ? (
                    <div className="loading-container">
                        <div className="loader"></div>
                        <p className="loading-text">Loading Categories...</p>
                    </div>
                ) : (
                    categories.map((category, index) => (
                        <label key={category.strCategory}
                            style={{ backgroundColor: colorArray[index % colorArray.length] }}
                        >
                            <input
                                type="radio"
                                name="category"
                                value={category.strCategory}
                                onChange={() => handleCategoryChange(category.strCategory)}
                            />
                            {category.strCategory} &nbsp;&gt;
                        </label>
                    ))
                )}
            </div>

            <div className="recipe-grid">
                {selectedCategory === "" &&
                    initialRecipes.map((recipe) => (
                        <div key={recipe.idMeal} className="recipe-card">
                            <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                className="recipe-image"
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
                                    <FavoriteIcon  recipe={recipe} favorites={favorites} setFavorites={setFavorites} />
                                </div>
                            </div>
                        </div>
                    ))}

                {selectedCategory !== "" &&
                    filteredRecipes.map((recipe) => (
                        <div key={recipe.idMeal} className="recipe-card">
                            <img
                                src={recipe.strMealThumb}
                                alt={recipe.strMeal}
                                className="recipe-image"
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
                                    <FavoriteIcon  recipe={recipe} favorites={favorites} setFavorites={setFavorites} />
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default Categories;
