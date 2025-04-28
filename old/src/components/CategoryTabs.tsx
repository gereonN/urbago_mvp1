import React, { useState } from 'react';

interface CategoryTabsProps {
  categories: {
    id: string;
    name: string;
    emoji: string;
  }[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange
}) => {
  return (
    <div className="categories-tabs">
      <button 
        className={`category-tab ${activeCategory === 'all' ? 'active' : ''}`}
        onClick={() => onCategoryChange('all')}
      >
        Alle
      </button>
      
      {categories.map(category => (
        <button 
          key={category.id}
          className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.emoji} {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryTabs;
