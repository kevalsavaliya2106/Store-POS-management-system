import React from 'react';
import styles from './PaymentPanel.module.css';

const PaymentPanel = ({ onAction }) => {
  const actions = [ 
    { label: 'CASH', type: 'cash', className: styles.green },
    { label: 'CHECK', type: 'check', className: styles.green },
    { label: 'CREDIT/DEBIT', type: 'card', className: styles.green },   
    { label: 'VOID INVOICE', type: 'void', className: styles.red },   
    { label: 'OPTIONS', type: 'options', className: styles.blue },
  ];

  return (
    <div className={styles.panel}>
      {actions.map(({ label, type, className }) => (
        <button
          key={type}
          className={`${styles.button} ${className}`}
          onClick={() => onAction(type)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default PaymentPanel;
