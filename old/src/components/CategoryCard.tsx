import React from 'react';

interface CategoryCardProps {
  id: string;
  title: string;
  icon: string;
  description?: string;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  icon,
  description,
  onClick
}) => {
  return (
    <div className="category-card" onClick={onClick}>
      <div className="category-icon">{icon}</div>
      <h4 className="category-title">{title}</h4>
      {description && (
        <p className="category-description">{description}</p>
      )}
    </div>
  );
};

export default CategoryCard;
