import React, { useState } from 'react';

const ProductCategoryDropdown = ({ categories, onSelectCategory }) => {
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (event) => {
    const category = event.target.value;
    setSelectedCategory(category);
    onSelectCategory(category);
  };

  return (
    <div>
      <label htmlFor="category">Select Category:</label>
      <select id="category" value={selectedCategory} onChange={handleChange}>
        <option value="">-- Select Category --</option>
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ProductCategoryDropdown;
