import React from 'react';
import ProductForm from './ProductForm';
import styles from './ProductPage.module.css'

const ProductPage = () => {
    return (
      <div>
        <h1 className={styles.title}>Product Management</h1>
        <ProductForm />
      </div>
    );
  };
  
  export default ProductPage;
  
