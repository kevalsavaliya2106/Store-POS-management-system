import React from 'react';
import styles from './ItemTable.module.css';

const ItemTable = ({ items, onSelect, selectedIndex }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Subtotal</th>
            <th>Tax</th>
          </tr>
        </thead>
        <tbody>
          {items.length === 0 ? (
            <tr>
              <td colSpan="6" className={styles.empty}>No items scanned.</td>
            </tr>
          ) : (
            items.map((item, index) => (
              <tr
                key={`${item.barcode}-${index}`}
                onClick={() => onSelect(index)}
                className={index === selectedIndex ? styles.selectedRow : ''}
                role="button"
                tabIndex="0"
              >
                <td>{index + 1}</td>
                <td>{item.name}</td>
                <td>{item.quantity}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>${((item.price * item.quantity) * (item.tax ?? 0)).toFixed(2)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ItemTable;
