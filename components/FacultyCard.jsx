import React from 'react';
import styles from './FacultyCard.module.css';

export default function FacultyCard({ name, photo, onClick }) {
  return (
    <div className={styles.item}>
      <div
        className={styles.card}
        role="button"
        tabIndex={0}
        aria-label={name}
        title={name}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick && onClick();
          }
        }}
      >
        <div className={styles.media}>
          <img src={photo} alt={name} className={styles.photo} loading="lazy" />
        </div>
      </div>
      <button
        type="button"
        className={styles.container}
        onClick={() => onClick && onClick()}
      >
        <span className={styles.buttonInner}>{name}</span>
      </button>
    </div>
  );
}
