import React from 'react';

interface SubcategoryChipProps {
  id: string;
  label: string;
  isActive?: boolean;
  onClick?: () => void;
}

const SubcategoryChip: React.FC<SubcategoryChipProps> = ({
  id,
  label,
  isActive = false,
  onClick
}) => {
  return (
    <button 
      className={`subcategory-chip ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

export default SubcategoryChip;
