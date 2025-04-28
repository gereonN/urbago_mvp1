import React from 'react';
import Link from 'next/link';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchBarWrapper}>
        <h2 className={styles.searchTitle}>Wie kann ich Dir in Deinem Garten helfen?</h2>
        <div className={styles.searchBar}>
          <input 
            type="text" 
            className={styles.searchInput} 
            placeholder="Stelle eine Frage..."
          />
          <div className={styles.searchButtons}>
            <button className={styles.searchButton}>
              <span className={styles.buttonIcon}>+</span>
            </button>
            <button className={styles.searchButton}>
              <span className={styles.buttonIcon}>?</span>
            </button>
          </div>
        </div>
      </div>
      <div className={styles.functionalArea}>
        <div className={styles.actionsContainer}>
          <div className={styles.databaseSection}>
            <Link href="/plants" className={styles.actionLink}>
              <span className={styles.actionIcon}>🌱</span>
              <span>Pflanzendatenbank</span>
            </Link>
          </div>
          <div className={styles.planningSection}>
            <Link href="/bed-planning" className={styles.actionLink}>
              <span className={styles.actionIcon}>🏡</span>
              <span>Beet planen</span>
            </Link>
          </div>
        </div>
        <div className={styles.infoButtons}>
          <button className={styles.infoButton}>
            <span className={styles.infoIcon}>i</span>
          </button>
          <button className={styles.infoButton}>
            <span className={styles.infoIcon}>?</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
