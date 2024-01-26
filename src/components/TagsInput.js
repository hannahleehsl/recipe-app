import React, { useState, useEffect } from 'react';

const TagsInput = ({ onTagsChange }) => {
  const [input, setInput] = useState('');
  const [tags, setTags] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);

    if (value.endsWith(',')) {
      const newTag = value.slice(0, -1).trim();
      if (newTag) {
        setTags([...tags, newTag]);
        setInput('');
      }
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, idx) => idx !== index));
  };

  useEffect(() => {
    onTagsChange(tags);
  }, [tags, onTagsChange]);

  return (
    <div className="tags-input-container">
      {tags.map((tag, index) => (
        <span key={index} className="tag">
          {tag}
          <span className="remove-tag" onClick={() => removeTag(index)}>&times;</span>
        </span>
      ))}
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Enter ingredients, separated by commas..."
      />
    </div>
  );
};

export default TagsInput;