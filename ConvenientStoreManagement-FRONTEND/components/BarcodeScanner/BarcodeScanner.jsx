import React, { useState } from 'react';
import styles from './BarcodeScanner.module.css';

const BarcodeScanner = ({ onScan }) => {
  const [barcode, setBarcode] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!barcode.trim()) return;
    onScan({ barcode, quantity: parseInt(quantity, 10) });
    setBarcode('');
    setQuantity(1);
  };

  return (
    <form className={styles.scanner} onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Scan Barcode Now..."
        value={barcode}
        onChange={(e) => setBarcode(e.target.value)}
        className={styles.barcodeInput}
      />
      <input
        type="number"
        min="1"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        className={styles.quantityInput}
      />
      <button type="submit" className={styles.scanButton}>
        Scan
      </button>
    </form>
  );
};

export default BarcodeScanner;
