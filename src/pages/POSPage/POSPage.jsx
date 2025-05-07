import React, { useState } from 'react';
import BarcodeScanner from '../../components/BarcodeScanner/BarcodeScanner';
import ItemTable from '../../components/ItemTable/ItemTable';
import PaymentPanel from '../../components/PaymentPanel/PaymentPanel';
import ActionButtons from '../../components/ActionButtons/ActionButtons';
import CustomerPanel from '../../components/CustomerPanel/CustomerPanel';
import InvoiceSummary from '../../components/InvoiceSummary/InvoiceSummary';
import ReceiptModal from '../../components/ReceiptModal/ReceiptModal.JSX';
import styles from './POSPage.module.css';

import { getCustomer, getProductByBarcode, makeGuestTransaction, makeLoyaltyTransaction } from '../../api/posApi';

const POSPage = () => {
  
  const [items, setItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [customer, setCustomer] = useState(null);
  const [changeDue, setChangeDue] = useState(null);
  const [showReceipt, setShowReceipt] = useState(false);
  const [lastPaymentMethod, setLastPaymentMethod] = useState('');

  
  const handleScan = async ({ barcode, quantity }) => {
    try {
      const product = await getProductByBarcode(barcode);
      const itemWithQuantity = { ...product, quantity };

      setItems(prev => [...prev, itemWithQuantity]);
    } catch (err) {
      console.error('Failed to fetch product:', err);
      alert('Item not found!');
    }
  };

  const handleSelectItem = (index) => {
    setSelectedIndex(index);
  };

  const handleActionClick = (type) => {
    if (selectedIndex === null) {
      alert('Please select an item first.');
      return;
    }
  
    const updatedItems = [...items];
    const selectedItem = updatedItems[selectedIndex];
  
    switch (type) {
      case 'delete':
        updatedItems.splice(selectedIndex, 1);
        setSelectedIndex(null);
        break;
      case 'discount': {
        const discount = prompt('Enter discount amount:');
        const parsed = parseFloat(discount);
        if (!isNaN(parsed) && parsed > 0 && parsed < selectedItem.price) {
          selectedItem.price -= parsed;
        }
        break;
      }
      case 'quantity': {
        const qty = prompt('Enter new quantity:');
        const parsed = parseInt(qty, 10);
        if (!isNaN(parsed) && parsed > 0) {
          selectedItem.quantity = parsed;
        }
        break;
      }
      case 'price': {
        const price = prompt('Enter new price:');
        const parsed = parseFloat(price);
        if (!isNaN(parsed) && parsed >= 0) {
          selectedItem.price = parsed;
        }
        break;
      }
      default:
        break;
    }
  
    setItems(updatedItems);
  };

  const handlePaymentAction = async (type) => {
    if (items.length === 0) {
      alert("No items to checkout.");
      return;
    }
  
    const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const transactionItems = items.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }));
  
    let paymentMethod = '';
    let change = 0;
  
    // Step 1: Handle Payment Input UI
    switch (type) {
      case 'cash': {
        const cashInput = prompt(`Total is $${(total + (total * 0.1)).toFixed(2)}. Enter cash given:`);
        const cash = parseFloat(cashInput);
        if (isNaN(cash) || cash < total) {
          alert("Insufficient amount or invalid input.");
          return;
        }
        change = cash - (total + (total * 0.1)).toFixed(2);
        setChangeDue(change);
        paymentMethod = "Cash";
        break;
      }
      case 'card': {
        alert("Please complete the payment on the pinpad.");
        paymentMethod = "Card";
        break;
      }
      case 'check': {
        const checkNumber = prompt("Enter check number:");
        if (!checkNumber || checkNumber.trim() === '') {
          alert("Check number is required.");
          return;
        }
        paymentMethod = "Check #" + checkNumber;
        break;
      }
      case 'void':
        alert("Invoice voided.");
        setItems([]);
        setCustomer(null);
        setChangeDue(null);
        return;
      default:
        return;
    }
  
    // Step 2: Construct Payload
    let payload;
    let isLoyalty = !!customer;
  
    if (isLoyalty) {
      payload = {
        phoneNumber: customer.phoneNumber,
        redeemPoints: customer.redeemPoints || 0,
        paymentMethod,
        items: transactionItems
      };
    } else {
      payload = {
        paymentMethod,
        items: transactionItems
      };
    }
  
    // Step 3: Call API
    try {
      if (isLoyalty) {
        console.log("Sending Loyalty Transaction:", payload);
        await makeLoyaltyTransaction(payload);
      } else {
        console.log("Sending Guest Transaction:", payload);
        await makeGuestTransaction(payload);
      }
  
      setLastPaymentMethod(paymentMethod);
      setShowReceipt(true);
      //setItems([]);
      //setCustomer(null);
      //setChangeDue(null);
      

    } catch (err) {
      alert("Transaction failed.");
      console.error(err);
    }
  };

  const handleReceiptClose = () => {
    setShowReceipt(false);
    setItems([]);
    setCustomer(null);
    setChangeDue(null);
  };
  
  

  const handleLookupCustomer = async(phone) => {
    try{
      const customer = await getCustomer(phone);
      return customer;
    }catch(err){
      alert('Customer not found');
      return null;
    }
  };

  return (
    <div className={styles.posContainer}>
    <div className={styles.leftPanel}>
      <h1 className={styles.title}>Quick Mart POS</h1>

      <div className={styles.leftContent}>
        <BarcodeScanner onScan={handleScan} />
        <ItemTable
          items={items}
          onSelect={handleSelectItem}
          selectedIndex={selectedIndex}
        />
      </div>

      <div className={styles.actionsBottom}>
        <ActionButtons onAction={handleActionClick} />
      </div>
    </div>
  
    <div className={styles.rightPanel}>
      <InvoiceSummary items={items} changeDue={changeDue} customer={customer} />
      <CustomerPanel onCustomerSelect={setCustomer} />
      <PaymentPanel onAction={handlePaymentAction} />
    </div>
  
    {showReceipt && (
      <ReceiptModal
        items={items}
        customer={customer}
        paymentMethod={lastPaymentMethod}
        changeDue={changeDue}
        onClose={handleReceiptClose}
      />
    )}
  </div>
  
  );
};

export default POSPage;
