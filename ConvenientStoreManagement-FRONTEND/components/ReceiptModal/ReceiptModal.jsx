import React from 'react';
import styles from './ReceiptModal.module.css';

const ReceiptModal = ({ items, customer, paymentMethod, changeDue = 0, onClose }) => {
  const now = new Date();
  const dateTime = now.toLocaleString();
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const taxTotal = items.reduce((sum, item) => sum + item.price * item.quantity * 0.1, 0); // 10% assumed tax
  const redeemed = customer?.redeemPoints ? customer.redeemPoints * 0.01 : 0;
  const total = subtotal + taxTotal - redeemed;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className={styles.backdrop}>
      <div className={styles.modal} id="receipt">
        <div className={styles.header}>
          <h2>🧾 Quick Mart</h2>
          <p>123 Main St, Cityville</p>
          <p>Tel: 555-123-4567</p>
          <div className={styles.divider} />
          <p><strong>{dateTime}</strong></p>
        </div>

        {customer && (
          <div className={styles.customer}>
            <p><strong>Customer:</strong> {customer.name}</p>
            <p><strong>Phone:</strong> {customer.phoneNumber}</p>
          </div>
        )}

        <div className={styles.divider} />

        <div className={styles.items}>
          {items.map((item, idx) => (
            <div key={idx} className={styles.itemRow}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemQty}>
                {item.quantity} x ${item.price.toFixed(2)}
              </span>
              <span className={styles.itemTax}>Tax: ${(item.price * item.quantity * 0.1).toFixed(2)}</span>
              <span className={styles.itemTotal}>
                ${(item.price * item.quantity * 1.1).toFixed(2)}
              </span>
            </div>
          ))}
        </div>

        <div className={styles.divider} />

        <div className={styles.totals}>
          <div><span>Subtotal:</span><span>${subtotal.toFixed(2)}</span></div>
          <div><span>Tax (10%):</span><span>${taxTotal.toFixed(2)}</span></div>
          {redeemed > 0 && (
            <div><span>Redeemed:</span><span>-${redeemed.toFixed(2)} ({customer.redeemPoints} pts)</span></div>
          )}
          <div className={styles.total}><span>Total:</span><span>${total.toFixed(2)}</span></div>
          <div><span>Payment:</span><span>{paymentMethod}</span></div>
          {paymentMethod.includes("Cash") && (
            <div className={styles.change}><span>Change:</span><span>${changeDue.toFixed(2)}</span></div>
          )}
        </div>

        <div className={styles.divider} />
        <p className={styles.center}>🎉 Thank you for shopping with Quick Mart!</p>
        <p className={styles.center}>Visit Again!</p>

        <div className={styles.actions}>
          <button onClick={handlePrint}>🖨 Print</button>
          <button onClick={onClose}>New Sale</button>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
