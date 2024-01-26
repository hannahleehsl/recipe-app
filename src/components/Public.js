import React, { useState } from 'react';
import TagsInput from './TagsInput'; // Make sure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Public = () => {
  const [recipes, setRecipes] = useState([]);
  const [tags, setTags] = useState([]);

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3500/recipes/by-ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ingredients: tags }),
      });

      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error('Fetch failed with status:', response.status);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <section className="public">
      <header>
        <h1><span className="nowrap">BakeMatch</span></h1>
      </header>
      <main className="public__main">
        <form onSubmit={handleSearch} className="search-bar">
          <TagsInput onTagsChange={handleTagsChange} />
          <button type="submit" className="search-btn">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
        <div className="search-results">
          {recipes.length > 0 ? (
            <ul>
              {recipes.map((recipe, index) => (
                <li key={index} className="recipe-item">{recipe.name}</li>
              ))}
            </ul>
          ) : (
            <p className="hidden">No recipes found.</p>
          )}
        </div>
      </main>
    </section>
  );
};

export default Public;