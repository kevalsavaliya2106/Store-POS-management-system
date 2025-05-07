import React from 'react';
import styles from './ActionButtons.module.css';

const ActionButtons = ({ onAction }) => {
  const actions = [
    { label: 'DELETE', type: 'delete' },
    { label: 'DISCOUNT', type: 'discount' },
    { label: 'QUAN CHANGE', type: 'quantity' },
    { label: 'PRICE CHANGE', type: 'price' },
  ];

  return (
    <div className={styles.container}>
      {actions.map(({ label, type }) => (
        <button
          key={type}
          onClick={() => onAction(type)}
          className={styles.button}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default ActionButtons;
