import React from 'react';
import Link from 'next/link';

interface NavigationBreadcrumbProps {
  items: {
    label: string;
    emoji?: string;
    href?: string;
  }[];
}

const NavigationBreadcrumb: React.FC<NavigationBreadcrumbProps> = ({
  items
}) => {
  return (
    <nav className="breadcrumb-navigation" aria-label="Breadcrumb">
      <ul className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link href="/" className="breadcrumb-link">Startseite</Link>
        </li>
        
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className="breadcrumb-separator">{'>'}</li>
            <li className={`breadcrumb-item ${index === items.length - 1 ? 'active' : ''}`}>
              {item.href && index !== items.length - 1 ? (
                <Link href={item.href} className="breadcrumb-link">
                  {item.emoji && <span className="breadcrumb-emoji">{item.emoji}</span>}
                  <span className="breadcrumb-text">{item.label}</span>
                </Link>
              ) : (
                <span className="breadcrumb-current">
                  {item.emoji && <span className="breadcrumb-emoji">{item.emoji}</span>}
                  <span className="breadcrumb-text">{item.label}</span>
                </span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};

export default NavigationBreadcrumb;
