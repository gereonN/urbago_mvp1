import React from 'react';
import Link from 'next/link';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ 
  items, 
  className = '' 
}) => {
  return (
    <nav className={`breadcrumb-container ${className}`} aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li 
            key={index} 
            className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}
          >
            {item.href && index !== items.length - 1 ? (
              <Link href={item.href}>
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
