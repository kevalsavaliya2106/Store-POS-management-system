import React from 'react';
import styles from './InvoiceSummary.module.css';

const InvoiceSummary = ({ items, changeDue, customer }) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totaltax = subtotal * 0.1;
  const discountTotal = items.reduce((sum, item) => {
    const original = item.originalPrice || item.price;
    return sum + (original - item.price) * item.quantity;
  }, 0);
  
  const redeemedValue = customer?.redeemPoints ? customer.redeemPoints : 0;
  const total = subtotal + totaltax - redeemedValue;

  return (
    <div className={styles.summary}>
      <div><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</div>
      {discountTotal > 0 && (
        <div><strong>Discount:</strong> -${discountTotal.toFixed(2)}</div>
      )}
      <div><strong>Total Tax:</strong> ${(subtotal * 0.10).toFixed(2)}</div>
      {discountTotal > 0 && (
        <div><strong>Discount:</strong> -${discountTotal.toFixed(2)}</div>
      )}
      {redeemedValue > 0 && (
        <div><strong>Redeemed:</strong> -${redeemedValue.toFixed(2)} ({customer.redeemPoints} pts)</div>
      )}
      <div><strong>Total:</strong> ${total.toFixed(2)}</div>
      {changeDue !== null && (
        <div className={styles.change}><strong>Change Due:</strong> ${changeDue.toFixed(2)}</div>
      )}
    </div>
  );
};

export default InvoiceSummary;
