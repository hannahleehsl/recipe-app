import React from 'react';

const RecipeDetail = ({ location }) => {
  const { name, ingredients } = location.state.recipe;

  return (
    <div>
      <h1>{name}</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeDetail;