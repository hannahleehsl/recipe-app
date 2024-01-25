import React from 'react';
import { useGetRecipesQuery } from './features/api/apiSlice';

const RecipeDashboard = () => {
  const {
    data: recipes,
    isLoading,
    isError,
    error,
  } = useGetRecipesQuery();

  // Handle loading and error states
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  // Render recipes
  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes?.map((recipe) => (
          <li key={recipe.id}>{recipe.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDashboard;