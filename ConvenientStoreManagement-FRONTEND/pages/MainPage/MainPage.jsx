import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './MainPage.module.css';

const MainPage = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.page}>
      <h1>🛒 Quick Mart Dashboard</h1>
      <div className={styles.navGrid}>
        <button onClick={() => navigate('/pos')} className={styles.card}>POS Terminal</button>
        <button onClick={() => navigate('/products')} className={styles.card}>Manage Products</button>
        <button onClick={() => navigate('/customers')} className={styles.card}>Manage Customers</button>
        <button onClick={() => navigate('/transactions')} className={styles.card}>Transaction History</button>
      </div>
    </div>
  );
};

export default MainPage;
