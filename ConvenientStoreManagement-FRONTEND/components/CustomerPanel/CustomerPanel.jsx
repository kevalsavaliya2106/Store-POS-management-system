import React, { useState } from 'react';
import styles from './CustomerPanel.module.css';
import { getCustomer } from '../../api/posApi';

const CustomerPanel = ({ onCustomerSelect }) => {
  const [phone, setPhone] = useState('');
  const [customer, setCustomer] = useState(null);
  const [redeemPoints, setRedeemPoints] = useState(0);

  const handleLookup = async () => {
    try {
      const result = await getCustomer(phone);
      setCustomer(result);
      setRedeemPoints(0);
      onCustomerSelect(null); // Don't send data yet — wait for redeem
    } catch (err) {
      alert('Customer not found.');
      setCustomer(null);
      onCustomerSelect(null);
    }
    setPhone('');
  };

  const handleRedeemConfirm = () => {
    if (!customer) return;

    if (redeemPoints < 0 || redeemPoints > customer.rewardPoints) {
      alert(`Enter a valid amount (0 - ${customer.rewardPoints})`);
      return;
    }

    const customerWithRedeem = { ...customer, redeemPoints };
    onCustomerSelect(customerWithRedeem);
    setCustomer(null);
    setRedeemPoints('');
  };

  return (
    <div className={styles.panel}>
      <div className={styles.inputGroup}>
        <input
          type="tel"
          placeholder="Enter phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.input}
        />
        <button onClick={handleLookup} className={styles.lookupBtn}>
          LOOKUP
        </button>
      </div>

      <div className={styles.info}>
        {customer ? (
          <>
            <p><strong>Name:</strong> {customer.name}</p>
            <p><strong>Phone:</strong> {customer.phoneNumber}</p>
            <p><strong>Points:</strong> {customer.rewardPoints}</p>

            <label>
              Redeem Points:
              <input
                type="number"
                value={redeemPoints}
                onChange={(e) => setRedeemPoints(parseInt(e.target.value, 10) || 0)}
                min="0"
                max={customer.rewardPoints}
              />
            </label>
            <button onClick={handleRedeemConfirm} className={styles.redeemBtn}>
              Redeem
            </button>
          </>
        ) : (
          <p>No customer selected.</p>
        )}
      </div>
    </div>
  );
};

export default CustomerPanel;
