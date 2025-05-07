package com.StoreManagement.inventory.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.StoreManagement.inventory.entity.Product;
import com.StoreManagement.inventory.entity.Supplier;
import com.StoreManagement.inventory.repository.ProductRepository;
import com.StoreManagement.inventory.repository.SupplierRepository;
import com.StoreManagement.pos.entity.SalesTransaction;
import com.StoreManagement.pos.repository.SalesTransactionRepository;

import java.util.List;
import java.util.Optional;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private SupplierRepository supplierRepository;

    // Add new product
    public Product addProduct(Product product) {
        // Validate and attach supplier
    	if (product.getSupplier() != null && product.getSupplier().getId() != null) {
            Supplier supplier = supplierRepository.findById(product.getSupplier().getId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            product.setSupplier(supplier);
        } else {
            throw new RuntimeException("Supplier information is required");
        }

        return productRepository.save(product);
    }

    // Get all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // Get product by ID
    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    // Update product
    public Product updateProduct(Long id, Product updatedProduct) {
        Product existingProduct = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        existingProduct.setBarcode(updatedProduct.getBarcode());
        existingProduct.setName(updatedProduct.getName());
        existingProduct.setItemSize(updatedProduct.getItemSize());
        existingProduct.setCost(updatedProduct.getCost());
        existingProduct.setPrice(updatedProduct.getPrice());
        existingProduct.setDepartment(updatedProduct.getDepartment());
        existingProduct.setTax(updatedProduct.getTax());
        existingProduct.setMinimumAge(updatedProduct.getMinimumAge());
        existingProduct.setStockQuantity(updatedProduct.getStockQuantity());

        // Update supplier if needed
        if (updatedProduct.getSupplier() != null && updatedProduct.getSupplier().getId() != null) {
            Supplier supplier = supplierRepository.findById(updatedProduct.getSupplier().getId())
                    .orElseThrow(() -> new RuntimeException("Supplier not found"));
            existingProduct.setSupplier(supplier);
        }

        return productRepository.save(existingProduct);
    }

    // Delete product
    public void deleteProduct(Long id) {
        if (!productRepository.existsById(id)) {
            throw new RuntimeException("Product not found");
        }
        productRepository.deleteById(id);
    }
}