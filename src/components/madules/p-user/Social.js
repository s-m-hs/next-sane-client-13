// components/Social.js

import React from 'react';
import styles from './Social.modul.css';

const Social = () => {
  return (
    <div className={styles.social}>
      <a
        href="https://www.linkedin.com/in/florin-cornea-b5118057/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fa fa-linkedin"></i>
      </a>
    </div>
  );
};

export default Social;
