import React, { useState, useEffect } from "react";

const FavoriteIcon = ({ recipe, favorites, setFavorites, additionalData }) => {
  const [isFavorited, setIsFavorited] = useState(false);

  // Check if the recipe is already in the favorites list
  useEffect(() => {
    setIsFavorited(favorites.some((fav) => fav.idMeal === recipe.idMeal));
  }, [favorites, recipe]);

  const toggleFavorite = () => {
    const updatedFavorites = favorites.some((fav) => fav.idMeal === recipe.idMeal)
      ? favorites.filter((fav) => fav.idMeal !== recipe.idMeal) // Remove if already favorited
      : [
          ...favorites,
          {
            ...recipe,
            rating: additionalData?.rating || recipe.rating || 'N/A',
            time: additionalData?.time || recipe.time || 'N/A',
          },
        ]; // Add with `rating` and `time`

    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <span className="favorite-icon" onClick={toggleFavorite}>
      <i
        className={`fa-heart ${isFavorited ? "fa-solid" : "fa-regular"}`}
        style={{ color: "#ff0000" }}
      ></i>
    </span>
  );
};

export default FavoriteIcon;
