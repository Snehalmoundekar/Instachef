import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchIngredientList } from '../services/mealdbApi'; 

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [ingredientList, setIngredientList] = useState([]); 
  const navigate = useNavigate();

  useEffect(() => {
    const loadIngredients = async () => {
      const ingredients = await fetchIngredientList();
      setIngredientList(ingredients); 
    };

    loadIngredients();
  }, []);

  const determineSearchType = (query) => {
    const lowerCaseQuery = query.toLowerCase();

    const isIngredient = ingredientList.some(
      (ingredient) => ingredient.toLowerCase() === lowerCaseQuery
    );

    return isIngredient ? 'ingredient' : 'name'; 
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      const searchType = determineSearchType(query);
      onSearch(query, searchType); 
      navigate('/recipes');
    }
  };

  return (
    <form onSubmit={handleSearch} className="search-bar d-flex align-items-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find More Recipes  I'm craving..."
        className="form-control rounded-0 search-nav-input search-bar-input"
      />
      <button type="submit" className="btn btn-primary rounded-0 navbar-search border-0 search-nav-input">
        <i className="fas fa-search"></i>
      </button>
    </form>
  );
};

export default SearchBar;
