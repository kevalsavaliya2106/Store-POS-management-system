import React, { useState } from 'react';
import styles from './ProductForm.module.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const ProductForm = () => {
  const initialProduct = {
    barcode: '',
    name: '',
    itemSize: '',
    cost: '',
    price: '',
    department: '',
    tax: '',
    minimumAge: '',
    stockQuantity: '',
    supplierId: ''
  };

  const [product, setProduct] = useState(initialProduct);
  const [isExistingProduct, setIsExistingProduct] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  const handleBarcodeChange = async (e) => {
    const barcode = e.target.value;
    setProduct({ ...product, barcode });
  
    if (barcode.length > 11) {
      try {
        const { data } = await axios.get(`http://localhost:8080/api/products/barcode/${barcode}`);
        setProduct({
          id: data.id || '',
          barcode: data.barcode || '',
          name: data.name || '',
          itemSize: data.itemSize || '',
          cost: data.cost || '',
          price: data.price || '',
          department: data.department || '',
          tax: data.tax || '',
          minimumAge: data.minimumAge || '',
          stockQuantity: data.stockQuantity || '',
          supplierId: data.supplierId || ''
        });
        setIsExistingProduct(true);
        toast.info('✅ Existing product loaded for editing.');
        console.log('Fetched product data:', data);

      } catch (error) {
        console.log('Barcode not found, switching to new mode');
        setProduct({ ...initialProduct, barcode });
        setIsExistingProduct(false);
        toast.info('🆕 New product. Please enter details.');
      }
    }
  };
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const payload = {
            ...product,
            supplier: { id: product.supplierId }
          };
          
      if (isExistingProduct) {
        await axios.put(`http://localhost:8080/api/products/${product.id}`, payload);
        toast.success('Product updated successfully.');
      } else {
        await axios.post(`http://localhost:8080/api/products`, payload);
        toast.success('New product added successfully.');
      }
      setProduct(initialProduct);
      setIsExistingProduct(false);
    } catch (error) {
      toast.error('An error occurred while saving the product.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>{isExistingProduct ? 'Edit Product' : 'Add New Product'}</h2>
      <p>{statusMessage}</p>
      <input
        type="text"
        name="barcode"
        value={product.barcode}
        onChange={handleBarcodeChange}
        placeholder="Barcode"
        required
      />
      <input
        type="text"
        name="name"
        value={product.name}
        onChange={handleChange}
        placeholder="Product Name"
        required
      />
      <input
        type="text"
        name="itemSize"
        value={product.itemSize}
        onChange={handleChange}
        placeholder="Item Size (e.g., 500ml)"
        required
      />
      <input
        type="number"
        name="cost"
        value={product.cost}
        onChange={handleChange}
        placeholder="Cost"
        required
      />
      <input
        type="number"
        name="price"
        value={product.price}
        onChange={handleChange}
        placeholder="Price"
        required
      />
      <input
        type="text"
        name="department"
        value={product.department}
        onChange={handleChange}
        placeholder="Department"
        required
      />
      <input
        type="number"
        name="tax"
        value={product.tax}
        onChange={handleChange}
        placeholder="Tax (e.g., 0.10 for 10%)"
        required
      />
      <input
        type="number"
        name="minimumAge"
        value={product.minimumAge}
        onChange={handleChange}
        placeholder="Minimum Age (if applicable)"
      />
      <input
        type="number"
        name="stockQuantity"
        value={product.stockQuantity}
        onChange={handleChange}
        placeholder="Stock Quantity"
        required
      />
      <input
        type="text"
        name="supplierId"
        value={product.supplierId}
        onChange={handleChange}
        placeholder="Supplier ID"
        required
      />
      <button type="submit">
        {isExistingProduct ? 'Update Product' : 'Add Product'}
      </button>
    </form>
  );
};

export default ProductForm;