import React, { useState, useEffect } from 'react';
import TagsInput from './TagsInput'; // Make sure this path is correct
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Public = () => {
  const [recipes, setRecipes] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const navigate = useNavigate();

  const openModalWithRecipe = (recipe) => {
    setSelectedRecipe(recipe);
    document.getElementById('dialog').showModal();
  };

  const closeModal = () => {
    document.getElementById('dialog').close();
    setSelectedRecipe(null);
  };

  const handleButtonClick = () => {
    navigate('/');
  };

  const handleTagsChange = (newTags) => {
    setTags(newTags);
  };

  const fetchRecipes = async () => {
    try {
      const response = await fetch('http://localhost:3500/recipes', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        const data = await response.json();
        setRecipes(data);
      } else {
        console.error('Failed to fetch recipes');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Fetch all recipes when the component mounts or tags change
  useEffect(() => {
    fetchRecipes();
  }, []);

  const handleSearch = async (event) => {
    event.preventDefault();
    if (tags.length > 0) {
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
    } else {
      // If tags are empty, fetch all recipes again
      setRecipes([]);
    }
  };


  return (
    <section className="public">
      <header>
        <h1><span className="nowrap" onClick={handleButtonClick}>BakeMatch</span></h1>
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
                <li key={index} className="recipe-item" onClick={() => openModalWithRecipe(recipe)}>
                  {recipe.name}
                </li>
              ))}
            </ul>
          ) : (
            <p className="hidden">No recipes found.</p>
          )}
        </div>
      </main>
      <dialog id="dialog" className="recipe-dialog">
        {selectedRecipe && (
          <>
            <h2>{selectedRecipe.name}</h2>
            <h3>Ingredients</h3>
            <ul>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3>Instructions</h3>
            <ol>
              {selectedRecipe.instructions && selectedRecipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
            <button className="button-20" onClick={closeModal}>Close</button>
          </>
        )}
      </dialog>
    </section>
  );
};

export default Public;