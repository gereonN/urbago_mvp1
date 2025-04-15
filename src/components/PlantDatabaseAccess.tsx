import React from 'react';
import styles from './PlantDatabaseAccess.module.css';
import Link from 'next/link';

const PlantDatabaseAccess = () => {
  return (
    <div className={styles.databaseContainer}>
      <h2 className={styles.title}>Pflanzendatenbank</h2>
      <p className={styles.description}>
        Entdecke über 50 Pflanzen für deinen urbanen Garten mit detaillierten Informationen zu Pflege, Wachstum und Kompatibilität.
      </p>
      <Link href="/pflanzendatenbank" className={styles.accessButton}>
        Entdecken
      </Link>
    </div>
  );
};

export default PlantDatabaseAccess;
