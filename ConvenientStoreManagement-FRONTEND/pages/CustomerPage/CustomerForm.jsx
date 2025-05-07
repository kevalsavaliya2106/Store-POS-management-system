import React, { useState } from 'react';
import axios from 'axios';
import styles from './CustomerForm.module.css';
import { toast } from 'react-toastify';

const initialCustomer = {
  name: '',
  phoneNumber: '',
  email: '',
  birthDate: '',
  address: '',
  notes: '',
  rewardPoints: 0,
};

const CustomerForm = () => {
  const [customer, setCustomer] = useState(initialCustomer);
  const [statusMessage, setStatusMessage] = useState('');
  const [isExisting, setIsExisting] = useState(false);
  const [loading, setLoading] = useState(false); // Spinner control

  const handlePhoneChange = async (e) => {
    const phone = e.target.value;
    setCustomer({ ...customer, phoneNumber: phone });
  
    if (phone.length === 10) {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/customers/${phone}`);
        setCustomer({
          id: data.id || '',
          name: data.name || '',
          phoneNumber: data.phoneNumber || '',
          email: data.email || '',
          birthDate: data.birthDate || '',
          address: data.address || '',
          notes: data.notes || '',
          rewardPoints: data.rewardPoints || 0,
        });
        setIsExisting(true);
        toast.info('✅ Existing customer loaded for editing.');
        console.log('Fetched customer:', data);
  
      } catch (error) {
        console.log('Customer not found, switching to new mode');
        setCustomer({ ...initialCustomer, phoneNumber: phone });
        setIsExisting(false);
        toast.info('🆕 New customer. Please enter details.');
      }
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isExisting) {
        await axios.put(`http://localhost:8080/api/customers/${customer.id}`, customer);
        toast.success('✅ Customer updated successfully.');
      } else {
        await axios.post(`http://localhost:8080/api/customers`, customer);
        toast.success('✅ New customer created.');
      }
      setCustomer(initialCustomer);
      setIsExisting(false);
    } catch (err) {
      console.error(err);
      toast.error('❌ Failed to save customer.');
    }finally {
        setLoading(false); // 👈 Stop loading
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{isExisting ? 'Edit Customer' : 'Add New Customer'}</h2>
      <p>{statusMessage}</p>

      <input
        type="tel"
        name="phoneNumber"
        value={customer?.phoneNumber || ''}
        onChange={handlePhoneChange}
        placeholder="Phone Number"
        required
      />
      <input
        name="name"
        value={customer?.name || ''}
        onChange={handleChange}
        placeholder="Full Name"
        required
      />
      <input
        type="email"
        name="email"
        value={customer?.email || ''}
        onChange={handleChange}
        placeholder="Email (optional)"
      />
      <input
        type="date"
        name="birthDate"
        value={customer?.birthDate || ''}
        onChange={handleChange}
        placeholder="Birth Date"
      />
      <input
        name="address"
        value={customer?.address || ''}
        onChange={handleChange}
        placeholder="Address"
      />
      <input
        name="notes"
        value={customer?.notes || ''}
        onChange={handleChange}
        placeholder="Notes (optional)"
      />
      <input
        type="number"
        name="rewardPoints"
        value={customer?.rewardPoints || ''}
        onChange={handleChange}
        placeholder="Reward Points"
        min="0"
      />

        <button type="submit" disabled={loading}>
        {loading ? (
            <TailSpin height="20" width="20" color="white" />
        ) : (
            isExisting ? 'Update Customer' : 'Create Customer'
        )}
        </button>
    </form>
  );
};

export default CustomerForm;
