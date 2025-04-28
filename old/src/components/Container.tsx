import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  fluid?: boolean;
}

const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '',
  fluid = false
}) => {
  return (
    <div className={`${fluid ? 'container-fluid' : 'container'} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
