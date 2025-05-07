import axios from 'axios';

export const getProductByBarcode = (barcode) => {
  return axios.get(`/api/products/barcode/${barcode}`);
};

export const addProduct = (product) => {
  return axios.post(`/api/products`, product);
};

export const updateProduct = (id, product) => {
  return axios.put(`/api/products/${id}`, product);
};
