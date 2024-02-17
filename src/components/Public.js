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

  useEffect(() => {
    // Fetch all recipes when the component mounts
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
    fetchRecipes();
  }, []);
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
            let data = await response.json();
            console.log(data);

            // Normalize search tags to lowercase and ensure it's an array of individual search terms
            const searchTerms = tags.map(tag => tag.toLowerCase().split(/\s+/)).flat();

            // Analyze and sort recipes based on match count
            data = data.map(recipe => {
                // Process ingredients into a flat array of lowercase words for comparison
                const ingredientWords = recipe.ingredients
                    .flatMap(ingredient => ingredient.toLowerCase().split(/\s+/));

                // Calculate match count by checking if any search term is included in any ingredient word
                const matchCount = ingredientWords.reduce((total, ingredientWord) => {
                    return total + (searchTerms.some(searchTerm => ingredientWord.includes(searchTerm)) ? 1 : 0);
                }, 0);

                return { ...recipe, matchCount };
            });

            // Filter out recipes with no matches and sort by match count in descending order
            data = data.filter(recipe => recipe.matchCount > 0);
            data.sort((a, b) => b.matchCount - a.matchCount);

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