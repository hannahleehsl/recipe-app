import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Public = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [recipes, setRecipes] = useState([]); // State to store the recipes

  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault(); // Prevent the default form submit action
    try {
      const response = await fetch('http://localhost:3500/recipes/by-ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: searchTerm.split(',') }),
      });
      if (response.ok) {
        const data = await response.json();
        setRecipes(data); // Update the recipes state with the fetched data
      } else {
        console.error('Fetch failed with status:', response.status);
        // Handle error cases here
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle network or other errors
    }
  };

  const content = (
    <section className="public">
      <header>
        <h1><span className="nowrap">Baking Recipe Finder!</span></h1>
      </header>
      <main className="public__main">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchTermChange}
            placeholder="Enter ingredients, separated by commas..."
          />
          <button type="submit">Search</button>
        </form>
        {/* Displaying the search results */}
        <div className="search-results">
          {recipes.length > 0 ? (
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index}>{recipe.name}</li>
              ))}
            </ul>
          ) : (
            <p>No recipes found.</p>
          )}
        </div>
      </main>
      <footer>
        <Link to="/recipes">Discover Recipes</Link>
      </footer>
    </section>
  );

  return content;
};

export default Public;