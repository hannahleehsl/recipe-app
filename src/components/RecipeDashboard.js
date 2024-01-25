import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const RecipeDashboard = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchIngredients = queryParams.get('ingredients');

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // Fetch recipes with similar ingredients based on the searchIngredients
    // You should make an API request to your backend here to get the recipes
    // Replace the sample API endpoint with your actual endpoint
    fetch(`/api/recipes/by-ingredients?ingredients=${encodeURIComponent(searchIngredients)}`)
      .then((response) => response.json())
      .then((data) => setRecipes(data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, [searchIngredients]);

  return (
    <div>
      <h2>Recipes with Ingredients: {searchIngredients}</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe._id}>
            <h3>{recipe.name}</h3>
            <p>Ingredients: {recipe.ingredients.join(', ')}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDashboard;