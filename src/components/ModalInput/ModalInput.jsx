import React, { useState, useEffect } from 'react';
import styles from './ModalInput.module.css';

const ModalInput = ({ isOpen, onClose, title, label, type = 'number', onSubmit }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (isOpen) setValue('');
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    const numeric = parseFloat(value);
    if (!isNaN(numeric)) {
      onSubmit(numeric);
      onClose();
    } else {
      alert('Enter a valid number!');
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3>{title}</h3>
        <label>
          {label}
          <input
            type={type}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
        </label>
        <div className={styles.actions}>
          <button onClick={handleSubmit}>Submit</button>
          <button onClick={onClose} className={styles.cancel}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ModalInput;
