import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { fetchRecipesByIngredient, fetchRecipesByName } from './services/mealdbApi';
import Navbar from './components/Navbar';
import Home from './components/Home';
import RecipeList from './components/RecipeList';
import FullRecipe from './components/FullRecipe';
import RecipeCard from './components/RecipeCard';
import Footer from './components/Footer';
import Categories from './components/Categories';
import Help from './components/Help';
import Privacy from './components/Privacy';
import Terms from './components/Terms';
import FavoriteRecipes from './components/FavoriteRecipes';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './App.css';
const App = () => {
  const [recipes, setRecipes] = useState([]);

  const handleSearch = async (query, searchType) => {
    let fetchedRecipes = [];

    if (searchType === 'ingredient') {
      fetchedRecipes = await fetchRecipesByIngredient(query);
    } else if (searchType === 'name') {
      fetchedRecipes = await fetchRecipesByName(query);
    }

    setRecipes(fetchedRecipes); // Update the state with fetched recipes
  };

  return (
    <Router>
      <div className="app">
        <Navbar onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Navigate to="/instachef" replace />} />
          <Route path="/instachef" element={<Home />} />
          <Route path="/recipesCard" element={<RecipeCard />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/help" element={<Help />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/recipes" element={<RecipeList recipes={recipes} />}/>
          <Route path="/recipe/:id" element={<FullRecipe />} />
          <Route path="/favorites" element={<FavoriteRecipes />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
