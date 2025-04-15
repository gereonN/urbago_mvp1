import React from 'react';

interface GridProps {
  children: React.ReactNode;
  className?: string;
  columns?: {
    mobile?: number;
    tablet?: number;
    desktop?: number;
  };
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl';
}

const Grid: React.FC<GridProps> = ({ 
  children, 
  className = '',
  columns = {
    mobile: 1,
    tablet: 2,
    desktop: 3
  },
  gap = 'm'
}) => {
  const gridClass = `grid grid-cols-${columns.mobile} md:grid-cols-${columns.tablet} lg:grid-cols-${columns.desktop} gap-${gap} ${className}`;
  
  return (
    <div className={gridClass}>
      {children}
    </div>
  );
};

export default Grid;
