import axios from 'axios';

const API_BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

// Fetch recipes by ingredient
const fetchRecipesByIngredient = async (ingredient) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/filter.php`, {
      params: { i: ingredient },
    });

    return response.data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes by ingredient:', error);
    return [];
  }
};
export const fetchIngredientList = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list.php`, {
      params: { i: 'list' },
    });

    return response.data.meals.map((ingredient) => ingredient.strIngredient) || [];
  } catch (error) {
    console.error('Error fetching ingredient list:', error);
    return [];
  }
};


// Fetch recipes by name (new function)
const fetchRecipesByName = async (name) => {
  try {
    // Manually encode while keeping '&' unencoded
    const encodedName = name.trim().replace(/ /g, '%20'); // Replace spaces only    
    // Construct the URL manually to avoid axios encoding '&'
    const url = `${API_BASE_URL}/search.php?s=${encodedName}`;
    const response = await axios.get(url);
    return response.data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes by name:', error);
    return [];
  }
};



// Fetch full recipe details by ID
const fetchFullRecipe = async (id) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/lookup.php`, {
      params: { i: id },
    });
    return response.data.meals[0]; // Return the first meal from the response
  } catch (error) {
    console.error('Error fetching full recipe:', error);
    return null;
  }
};
const fetchCategories = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/list.php`, {
      params: { c: 'list' }, 
    });
    return response.data.meals || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
};
const fetchRecipesByCategory = async (ingredient) => {
  try {
      const response = await axios.get(`${API_BASE_URL}/filter.php`, {
      params: { c: ingredient },
    });

    return response.data.meals || [];
  } catch (error) {
    console.error('Error fetching recipes by ingredient:', error);
    return [];
  }
};



export { fetchRecipesByIngredient, fetchRecipesByName, fetchFullRecipe,fetchCategories,fetchRecipesByCategory};
