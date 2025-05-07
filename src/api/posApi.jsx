import axios from 'axios';
import { UNSAFE_RemixErrorBoundary } from 'react-router-dom';

const BASE_URL = 'http://localhost:8080/api';

export const getProductByBarcode = async (barcode) => {
    const response = await axios.get(`${BASE_URL}/products/barcode/${encodeURIComponent(barcode)}`);
    return response.data;
  };

export const makeGuestTransaction = async (data) => {
  const response = await axios.post('http://localhost:8080/api/transactions', data);
  return response.data;
};

export const makeLoyaltyTransaction = async (data) => {
  const response = await axios.post('http://localhost:8080/api/transactions/redeem', data);
  return response.data;
};

export const getCustomer = async (phonenumber) => {
  const response = await axios.get(`${BASE_URL}/customers/${encodeURIComponent(phonenumber)}`);
  return response.data;
};

  


