import React from 'react';
import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerLinks}>
          <Link href="/impressum" className={styles.footerLink}>
            Impressum
          </Link>
          <Link href="/agb" className={styles.footerLink}>
            AGB
          </Link>
        </div>
        <div className={styles.copyright}>
          © {new Date().getFullYear()} Urbago MVP AI Gardening Agent - Bring deine urbane Oase zum Blühen! 🌱
        </div>
      </div>
    </footer>
  );
};

export default Footer;
