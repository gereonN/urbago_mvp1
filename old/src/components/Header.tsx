import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image 
            src="/images/Urbago_logo_nebeneinander_schwarz.svg" 
            alt="Urbago Logo" 
            width={140} 
            height={40} 
            priority
            className={styles.logoImage}
          />
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li className={styles.navItem}>
            <Link href="/dein-garten" className={styles.navLink}>
              Dein Garten
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/shop" className={styles.navLink}>
              Shop
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/community" className={styles.navLink}>
              Community
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/planer" className={styles.navLink}>
              Planer
            </Link>
          </li>
          <li className={styles.navItem}>
            <Link href="/das-projekt" className={styles.navLink}>
              Das Projekt
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
