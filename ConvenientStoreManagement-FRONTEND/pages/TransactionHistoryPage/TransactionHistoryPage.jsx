import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReceiptModal from '../../components/ReceiptModal/ReceiptModal';
import styles from './TransactionHistoryPage.module.css';

const TransactionHistoryPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:8080/api/transactions/recent')
      .then(res => setTransactions(res.data))
      .catch(err => console.error("Failed to load transactions", err));
  }, []);

  const handleReprint = (txn) => {
    const items = txn.products.map(p => ({
      name: p.product.name,
      price: p.unitPrice,
      quantity: p.quantity
    }));
    const fakeCustomer = txn.customer
      ? { ...txn.customer, redeemPoints: txn.redeemedAmount * 100 } 
      : null;

    setSelectedTxn({
      items,
      customer: fakeCustomer,
      paymentMethod: txn.paymentMethod,
      changeDue: 0
    });

    setShowReceipt(true);
  };

  return (
    <div className={styles.container}>
      <h1>🧾 Recent Transactions</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Customer</th>
            <th>Amount</th>
            <th>Payment</th>
            <th>Reprint</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map(txn => (
            <tr key={txn.id}>
              <td>{txn.id}</td>
              <td>{new Date(txn.transactionTime).toLocaleString()}</td>
              <td>{txn.customer?.name || 'Guest'}</td>
              <td>${txn.totalAmount.toFixed(2)}</td>
              <td>{txn.paymentMethod}</td>
              <td><button onClick={() => handleReprint(txn)}>🖨 Print</button></td>
            </tr>
          ))}
        </tbody>
      </table>

      {showReceipt && (
        <ReceiptModal
          items={selectedTxn.items}
          customer={selectedTxn.customer}
          paymentMethod={selectedTxn.paymentMethod}
          changeDue={selectedTxn.changeDue}
          onClose={() => setShowReceipt(false)}
        />
      )}
    </div>
  );
};

export default TransactionHistoryPage;
